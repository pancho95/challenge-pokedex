import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import SearchFilter from "./SearchFilter";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
};

const renderAt = (url = "/") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <SearchFilter />
      <LocationDisplay />
    </MemoryRouter>,
  );

const getInput = () =>
  screen.getByPlaceholderText("Buscar Pokémon por nombre o ID");
const getSearch = () => screen.getByTestId("location").textContent;
const advance = (ms) => act(() => vi.advanceTimersByTime(ms));
const type = (value) => fireEvent.change(getInput(), { target: { value } });

describe("SearchFilter - debounce de 300ms", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("no actualiza la URL antes de 300ms", () => {
    renderAt();
    type("pika");
    advance(299);
    expect(getSearch()).toBe("");
  });

  it("actualiza la URL a los 300ms", () => {
    renderAt();
    type("pika");
    advance(300);
    expect(getSearch()).toBe("?search=pika");
  });

  it("al escribir rápido solo cuenta el último valor", () => {
    renderAt();
    type("p");
    advance(100);
    type("pi");
    advance(100);
    type("pika");
    advance(299);
    expect(getSearch()).toBe("");
    advance(1);
    expect(getSearch()).toBe("?search=pika");
  });

  it("normaliza el texto (trim y minúsculas)", () => {
    renderAt();
    type("  PIKA  ");
    advance(300);
    expect(getSearch()).toBe("?search=pika");
  });

  it("conserva los otros filtros de la URL", () => {
    renderAt("/?type=fire");
    type("char");
    advance(300);
    expect(getSearch()).toContain("type=fire");
    expect(getSearch()).toContain("search=char");
  });

  it("quita el param search si se borra el texto", () => {
    renderAt("/?search=pika");
    type("");
    advance(300);
    expect(getSearch()).toBe("");
  });

  it("'Limpiar filtros' vacía la URL y el input", () => {
    renderAt("/?search=pika&type=fire");
    expect(getInput()).toHaveValue("pika");
    fireEvent.click(screen.getByText("Limpiar filtros"));
    advance(300);
    expect(getSearch()).toBe("");
    expect(getInput()).toHaveValue("");
  });
});

describe("SearchFilter - filtros por URL", () => {
  it("el select de tipo escribe y lee el query param", () => {
    renderAt("/?type=water");
    expect(screen.getByDisplayValue("Agua")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("Agua"), {
      target: { value: "fire" },
    });
    expect(getSearch()).toBe("?type=fire");
  });
});
