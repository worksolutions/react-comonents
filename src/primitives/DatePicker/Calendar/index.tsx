import React from "react";
import { Placement } from "@popperjs/core";
import moment, { Moment } from "moment";
import { range } from "ramda";

import {
  ai,
  borderRadius,
  flex,
  flexColumn,
  flexValue,
  jc,
  marginBottom,
  marginRight,
  marginTop,
  padding,
  width,
  backgroundColor,
  border,
} from "../../../styles";

import Wrapper from "../../Wrapper";
import { getPopperMarginStyleForPlacement } from "../../Popper/usePopper";
import Button, { ButtonSize, ButtonType } from "../../Button";

import ButtonsList from "./ButtonsList";
import { SwitchModeButton } from "./SwitchModeButton";
import { useMonthCalculation } from "./libs";
import CalendarView from "./CalendarView";
import { cb } from "../../../CB";
import { elevation16 } from "../../../constants/shadows";
import { useEffectSkipFirst } from "@worksolutions/react-utils";
import { intl } from "../../../intl";

interface CalendarInterface {
  min: Moment;
  max: Moment;
  value: string | null;
  placement: Placement;
  momentFormat: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string) => void;
}

type ViewMode = "year" | "month" | "date";

export default cb(
  {
    useStateBuilder: ({ onChange, value, momentFormat, min, max }: CalendarInterface) => {
      function calculateMomentValueFromIncomeValue() {
        return value ? moment(value, momentFormat) : moment();
      }

      const [innerMomentValue, setInnerMomentValue] = React.useState(calculateMomentValueFromIncomeValue);

      const year = React.useMemo(() => innerMomentValue.year(), [innerMomentValue]);

      useEffectSkipFirst(() => {
        setInnerMomentValue(calculateMomentValueFromIncomeValue);
      }, [value]);
      const months = useMonthCalculation(year, min, max);
      const years = React.useMemo(() => range(min.year(), max.year() + 1), []);

      function clickOnTodayButton() {
        setInnerMomentValue(intl.currentLocalDate);
        onChange(intl.currentLocalDate.format(momentFormat));
      }

      function changeYear(year: number) {
        const newValue = moment(innerMomentValue).year(year);
        if (newValue.isBefore(min)) {
          setInnerMomentValue(min);
          return;
        }
        if (newValue.isAfter(max)) {
          setInnerMomentValue(max);
          return;
        }
        setInnerMomentValue(newValue);
      }
      return {
        years,
        year,
        months,
        innerMomentValue,
        setInnerMomentValue,
        clickOnTodayButton,
        changeYear,
      };
    },
    computed: {
      selectedMomentValue: ({ value, momentFormat }) => [() => (value ? moment(value, momentFormat) : null), [value]],
      month: (_, { innerMomentValue }) => [() => innerMomentValue.month(), [innerMomentValue]],
      leftControlButtonDisabled: ({ min }, { innerMomentValue }) => [
        () => innerMomentValue.isSameOrBefore(min, "month"),
        [innerMomentValue],
      ],
      rightControlButtonDisabled: ({ max }, { innerMomentValue }) => [
        () => innerMomentValue.isSameOrAfter(max, "month"),
        [innerMomentValue],
      ],
    },
  },
  function Calendar(
    { placement, momentFormat, hasCurrentDayButton, onChange },
    {
      state: { months, setInnerMomentValue, innerMomentValue, year, years, clickOnTodayButton, changeYear },
      computed: { selectedMomentValue, month, rightControlButtonDisabled, leftControlButtonDisabled },
    },
  ) {
    const [mode, setMode] = React.useState<ViewMode>("date");

    function toggleMode(newMode: ViewMode) {
      if (newMode === mode) {
        setMode("date");
        return;
      }
      setMode(newMode);
    }

    const allControlButtonDisabled = mode !== "date";

    return (
      <Wrapper
        styles={[
          width(306),
          getPopperMarginStyleForPlacement(placement, 4),
          padding(12),
          backgroundColor("white"),
          border(1, "gray-blue/02"),
          elevation16,
          borderRadius(6),
          flex,
          flexColumn,
        ]}
      >
        <Wrapper styles={[flex, flexValue(1), ai("center"), marginBottom(12)]}>
          <Button
            disabled={allControlButtonDisabled || leftControlButtonDisabled}
            styles={marginRight(8)}
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft="arrow-left-long"
            onClick={() => setInnerMomentValue(moment(innerMomentValue).subtract(1, "month"))}
          />
          <SwitchModeButton
            styles={marginRight(8)}
            opened={mode === "month"}
            onClick={() => toggleMode("month")}
            value={months[month]!}
            width={108}
          />
          <SwitchModeButton
            styles={marginRight(8)}
            opened={mode === "year"}
            onClick={() => toggleMode("year")}
            value={year}
            width={84}
          />
          <Button
            disabled={allControlButtonDisabled || rightControlButtonDisabled}
            type={ButtonType.ICON}
            size={ButtonSize.MEDIUM}
            iconLeft="arrow-right-long"
            onClick={() => setInnerMomentValue(moment(innerMomentValue).add(1, "month"))}
          />
        </Wrapper>
        {mode === "date" && (
          <CalendarView
            currentInnerValue={innerMomentValue}
            selectedValue={selectedMomentValue}
            onChange={(day) => onChange(moment(innerMomentValue).date(day).format(momentFormat))}
          />
        )}
        {mode === "month" && (
          <ButtonsList
            items={months}
            selectedItemIndex={month}
            onClick={(month) => {
              setInnerMomentValue(moment(innerMomentValue).month(month));
              toggleMode("date");
            }}
          />
        )}
        {mode === "year" && (
          <ButtonsList
            items={years}
            selectedItemIndex={years.indexOf(year)}
            onClick={(index) => {
              toggleMode("date");
              changeYear(years[index]);
            }}
          />
        )}
        {hasCurrentDayButton && (
          <Wrapper styles={[flex, jc("center")]}>
            <Button styles={marginTop(4)} size={ButtonSize.MEDIUM} type={ButtonType.GHOST} onClick={clickOnTodayButton}>
              {intl.text("components.calendar.todayButtonText")} {intl.currentLocalDate.format(momentFormat)}
            </Button>
          </Wrapper>
        )}
      </Wrapper>
    );
  },
);
