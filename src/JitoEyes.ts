import { compact, Main } from "jito";
import { JitoEye } from "./JitoEye";

const main: Main = () => {
  return [
    {
      "jito-eye": JitoEye,
    },
  ];
};

export const JitoEyes = compact(
  `
<style>
#jitoeyes {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
<div id="jitoeyes">
  <jito-eye />
  <jito-eye />
</div>`,
  main,
);
