import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  margin:50px 45% ;
  width: 150px;
  height: 150px;
  background: #2C3A47;
  border-radius: 50%;
`;

const Circle = styled.div`

`;

const MaskFull = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
`;

const Fill = styled.div`
  clip: rect(0px, 150px, 150px, 0px);
  background-color:#B33771;
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
`;

const InsideCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  line-height: 130px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 2em;
`;

const SecondMask = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
`;
////////////////////////////////////////
const WrapperC2 = styled.div`
  margin:-150px 20%;
  width: 150px;
  height: 150px;
  background: #2C3A47;
  border-radius: 50%;
`;

const CircleC2 = styled.div`

`;

const MaskFullC2 = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
`;

const FillC2 = styled.div`
  clip: rect(0px, 75px, 150px, 0px);
  background-color:#B33771;
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
`;

const InsideCircleC2 = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  line-height: 130px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 2em;
`;

const SecondMaskC2 = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
`;
////////////////////////////////
const WrapperC3 = styled.div`
  margin:-40px 70%;
  width: 150px;
  height: 150px;
  background: #2C3A47;
  border-radius: 50%;
`;

const CircleC3 = styled.div`

`;

const MaskFullC3 = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
`;

const FillC3 = styled.div`
  clip: rect(0px, 75px, 150px, 0px);
  background-color:#B33771;
  animation: fill ease-in-out 3s;
  transform: rotate(126deg);
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
`;

const InsideCircleC3 = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  line-height: 130px;
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 100;
  font-weight: 700;
  font-size: 2em;
`;

const SecondMaskC3 = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0px, 150px, 150px, 75px);
`;
const Avatar = () => {
  return (
    <>
    <Wrapper>
      <Circle>
        <MaskFull>
          <Fill />
        </MaskFull>
        <SecondMask>
          <Fill />
        </SecondMask>
        <InsideCircle>90%</InsideCircle>
      </Circle>
    </Wrapper>
    {/* //////////////////////////////// */}
    <WrapperC2>
      <CircleC2>
        <MaskFullC2>
          <FillC2 />
        </MaskFullC2>
        <SecondMaskC2>
          <FillC2 />
        </SecondMaskC2>
        <InsideCircleC2>80%</InsideCircleC2>
      </CircleC2>
    </WrapperC2>
    {/* ////////////////////////////////// */}
    <WrapperC3>
      <CircleC3>
        <MaskFullC3>
          <FillC3 />
        </MaskFullC3>
        <SecondMaskC3>
          <FillC3 />
        </SecondMaskC3>
        <InsideCircleC3>80%</InsideCircleC3>
      </CircleC3>
    </WrapperC3>
    </>
    
  );
};

export default Avatar;