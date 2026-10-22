import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import SavingsPlanner from "./SavingsPlanner";

test("updates the time to a savings goal from the monthly contribution", () => {
  render(<SavingsPlanner />);
  expect(screen.getByTestId("savings-months")).toHaveTextContent("10");
  fireEvent.change(screen.getByLabelText("Monthly contribution"), {
    target: { value: "200" },
  });
  expect(screen.getByTestId("savings-months")).toHaveTextContent("5");
});
test("explains a zero contribution and an already funded goal", () => {
  render(<SavingsPlanner />);
  fireEvent.change(screen.getByLabelText("Monthly contribution"), {
    target: { value: "0" },
  });
  expect(screen.getByRole("status")).toHaveTextContent(
    "Add a monthly contribution",
  );
  fireEvent.change(screen.getByLabelText("Already saved"), {
    target: { value: "1000" },
  });
  expect(screen.getByRole("status")).toHaveTextContent("Goal reached");
});
