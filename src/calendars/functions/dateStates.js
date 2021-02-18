const selectedDateState = {
  startDate: {
    data: [0, 0, 0],
    element: null,
  },
  endDate: {
    data: [0, 0, 0],
    element: null,
  },
};

const createState = (element, clickedDate, targetDate) => {
  selectedDateState[targetDate].data = clickedDate;
  selectedDateState[targetDate].element = element;
  selectedDateState[targetDate].element.classList.add("selected");
};

const updateState = (element, clickedDate, targetDate) => {
  selectedDateState[targetDate].element.classList.remove("selected");
  selectedDateState[targetDate].data = clickedDate;
  selectedDateState[targetDate].element = element;
  selectedDateState[targetDate].element.classList.add("selected");
};

const removeState = (targetDate) => {
  selectedDateState[targetDate].element.classList.remove("selected");
  selectedDateState[targetDate].data = [0, 0, 0];
  selectedDateState[targetDate].element = null;
};

export { selectedDateState, createState, updateState, removeState };
