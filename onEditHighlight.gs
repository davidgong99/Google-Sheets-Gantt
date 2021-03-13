// ===============================================================================
// ======================================
// =
// =            Configuration
// =
// ======================================
// Configuration
ranges = {
  'ganttStartColNum': '9',
  'ganttStartCol': 'J',
  'ganttStartRow': '5',
  'ganttEndCol': 'JY',
  'ganttEndRow': '50',
  'colStatus': 'A',
  'colCompany': 'B',
  'colRole': 'C',
  'colRoleType': 'D',
  'colOpeningDate': 'E',
  'colClosingDate': 'F',
  'colLink': 'G',
  'rowFirstData': '6',
  'rowMonths': '3',
  'rowDates': '4',
} // call as ranges['ganttStart']

// T his function will be 
function onEditHighlight(e) {
  ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Grad jobs');

  for (i in e) {
    Logger.log(i);
  }
  var range = e.range;
  var row = range.getRow(); // returns row number
  Logger.log(row);

  var editedRowsRange = ss.getRange("A"+row+":"+ranges["ganttEndCol"]+row);
  editedRowsRange.setBackground('white');

  var editedRows = editedRowsRange.getValues();
  
  Logger.log(editedRows)
  var openingD = editedRows[0][4];
  var closingD = editedRows[0][5];
  // depends on if input counted as date or string
  // if (openingD.includes("/")) { // string in form of dd/mm/yy
  // if (typeof(openingD) == typeof(String)) {

    Logger.log(openingD + " == String");

    openingDateArr = openingD.split("/")
    closingDateArr = closingD.split("/")

    openingDay = openingDateArr[0];
    openingMonth = openingDateArr[1];
    openingYear = openingDateArr[2];

    closingDay = closingDateArr[0];
    closingMonth = closingDateArr[1];
    closingYear = closingDateArr[2];
  //   Logger.log("Day == " + dd.getMonth())
  // } else { // string in form of February 17, 2018 13:00:00
  //   Logger.log(openingD + " == object");
  //   // var dd = editedRows[0][4];
  //   var openingObj = new Date(openingD)
  //   var closingObj = new Date(closingD)
  //   Logger.log("month = " + openingObj.getMonth());

  //   openingDay = openingObj.getDay()
  //   openingMonth = openingObj.getMonth()
  //   openingYear = openingObj.getFullYear()

  //   closingDay = closingObj.getDay()
  //   closingMonth = closingObj.getMonth()
  //   closingYear = closingObj.getFullYear()
  // }

  
  

  openDateCol = getColumn(ss,openingDay,openingMonth);
  closeDateCol = getColumn(ss, closingDay, closingMonth);

  if (openDateCol == -1 || closeDateCol == -1) {
    return -1
  }

  highlightRangeGreen = ss.getRange(row,openDateCol, 1, closeDateCol - openDateCol);
  highlightRangeGreen.setBackground('#b7e1cd');

  highlightRangeRed = ss.getRange(row, closeDateCol, 1, 1);
  highlightRangeRed.setBackground('#ea4335');

  // getRange()
  // range.setBackground(color)
}


// given a day and month (integers), return the column it is in
// iterate through row 4, until matching numbers are found
function getColumn(ss, day, month) {

  var dateRangeStr = ranges["ganttStartCol"] + ranges["rowDates"] + ":" + ranges["ganttEndCol"] + ranges["rowDates"];
  var dateRow = ss.getRange(dateRangeStr).getValues();

  var currMonth = 0;
  var currDay = 0;
  var i = 0;
  while (i < dateRow[0].length) {
    // if date matches, return column
    // if day == 1, that means new month

    if (dateRow[0][i] == day && month == currMonth) {
      // return "FOUND AT i= " + String(i + Number(ranges["ganttStartColNumber"]) - 1);
      return i + Number(ranges["ganttStartColNum"]) + 1;
    }

    if (dateRow[0][i] == "1") {
      Logger.log("new month (1) found at i=" + i);
      currMonth ++;
    }

    i++;
  }

  Logger.log("month not found")
  return -1

}
