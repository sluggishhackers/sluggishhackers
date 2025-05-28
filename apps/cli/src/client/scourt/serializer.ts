export const makeUniqIdFromCsNoLstCtt = (csNoLstCtt: string) => {
  return csNoLstCtt.replaceAll(" ", "_");
};
