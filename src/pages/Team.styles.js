import styled from "styled-components";

export const TeamPage = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
  box-sizing: border-box;
  color: #252936;
`;

export const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
    margin: 0 0 8px 0;
  }

  p {
    color: #777e8d;
    font-size: 15px;
    margin: 0;
  }
`;

export const TeamCounter = styled.span`
  display: inline-block;
  margin-top: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  background: #eceef2;
  color: #343a48;
  font-weight: 700;
  font-size: 14px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 15px 20px;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    opacity: 0.6;
    filter: grayscale(40%);
  }

  h2 {
    margin: 0;
    font-size: 22px;
    color: #343a48;
  }

  p {
    margin: 0;
    color: #777e8d;
    max-width: 400px;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  background: #4caf50;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;

  &:hover {
    background: #43a047;
    transform: translateY(-2px);
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const TeamMemberCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #fee2e2;
  color: #ef4444;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.2s;

  &:hover {
    background: #ef4444;
    color: #ffffff;
    transform: scale(1.1);
  }
`;

export const MemberImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 12px;
  filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.1));
  cursor: pointer;
`;

export const MemberName = styled.h3`
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 800;
  text-transform: capitalize;
  color: #252936;
  cursor: pointer;

  &:hover {
    color: #4caf50;
  }
`;

export const MemberNumber = styled.span`
  color: #858b98;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TypeBadge = styled.span`
  padding: 6px 14px;
  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  background-color: ${(props) => props.$bgColor};
  text-transform: uppercase;
`;
