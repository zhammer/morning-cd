import { useContext, useMemo } from "react";
import SundialContext from "../../hooks/useSundial/context";

export default function useIsDaySundialConsumer(): boolean {
  const { calibrating, isDay } = useContext(SundialContext);
  const isDayProp = useMemo(() => (calibrating || isDay), [calibrating, isDay]);

  return isDayProp;
}
