import styled, { keyframes } from "styled-components";
export const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonBase = styled.div`
  background: #e5e7eb;
  background-image: linear-gradient(
    90deg,
    #e5e7eb 0px,
    #f3f4f6 40px,
    #e5e7eb 80px
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 6px;
`;

export const SkeletonNumber = styled(SkeletonBase)`
  width: 45px;
  height: 14px;
  display: inline-block;
  border-radius: 4px;
`;

export const SkeletonImageCircle = styled(SkeletonBase)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

export const SkeletonText = styled(SkeletonBase)`
  width: 90px;
  height: 20px;
  margin: 0 auto;
  border-radius: 4px;
`;

export const SkeletonBadge = styled(SkeletonBase)`
  width: 55px;
  height: 20px;
  border-radius: 12px;
`;
