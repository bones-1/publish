class Calendar {
  constructor(yearX, monthY) {
    this.year = yearX || new Date().getFullYear();
    this.month = monthY || new Date().getMonth() + 1;

    Object.defineProperties(this, {
      _daysInMonth: {
        writable: true
      },
      _weekStartDay: {
        writable: true
      },
      _year: {
        writable: true
      },
      _month: {
        writable: true
      }
    })
  }

  // Getters and setters to validate input from user and return input if needed.
  get year() {
    return this._year;
  }

  get month() {
    return this._month;
  }

  set year(value) {
    if (Number.isInteger(value) && value > 1970 && value < 5000) {
      this._year = Math.trunc(value);
    } else {
      console.warn(`Enter a valid year.`);
      console.info(`Year range: 1970 - 5000`);
    }
  }

  set month(value) {
    if (Number.isInteger(value) && value >= 1 && value <= 12) {
      this._month = Math.trunc(value);
      this._month--;
    } else {
      console.warn(`Enter a valid month.`);
      console.info(`Month range: 1 - 12`);
    }
  }

  // Grabs the amount of days in the spicified month, and the day of the week that the month starts.
  generateCal() {
    this._daysInMonth = new Date(this._year, this._month + 1, 0).getDate();
    this._weekStartDay = new Date(this._year, this._month).getDay();
  }

  printCal() {
    // Initialize object properties
    this.generateCal();

    const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Print year and month
    console.log(`\n\t${this._year}\n\t${MONTHS[this._month]}\n`);

    // Print weekdays
    console.log(WEEKDAYS.join(" | "));

    // Initialize the buffer
    let buffer = Array(7);
    buffer.fill("  ");

    // Print calendar days
    for (
      let day = 1, pos = this._weekStartDay;
      day <= this._daysInMonth;
      day++, pos++
    ) {
      if (pos && pos > 6) {
        flush();
        pos = 0;
      }

      buffer[pos] = day;
    }

    // print the last week
    flush();

    function flush() {
      // Pad a `0' to the left of single digits.
      buffer = buffer.map((v) =>
        v < 10 && typeof v == "number" ? "0" + v : v
      );
      console.log(buffer.join(" | "));
      buffer.fill("  ");
    }
  }
}

// Create a wrapper function to easily print calendar
function showCal(year, month) {
  const calendar = new Calendar();

  if (arguments.length == 2) {
    calendar.year = year;
    calendar.month = month;
  }
  calendar.printCal();
}

// Print the calendar with optional args.
showCal(2013, 8);
