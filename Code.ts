/**
 * Sasini & Janaka – RSVP receiver (Google Apps Script)
 *
 * Sheet: https://docs.google.com/spreadsheets/d/1pSeRBSnlpRsk250AqqmmMpbA2r2vYc97OaWUKlmqx8k/edit
 *
 * Setup:
 *  1. Open the sheet → Extensions → Apps Script.
 *  2. Delete everything in Code.gs and paste this whole file.
 *  3. Save, then Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *  4. Authorise, copy the Web app URL (ends with /exec)
 *     and paste it into SCRIPT_URL in src/App.tsx.
 *
 * The website RSVP form sends: Name, Attending, Guests, Wish, Invited As
 */

const SPREADSHEET_ID = "1pSeRBSnlpRsk250AqqmmMpbA2r2vYc97OaWUKlmqx8k";
const SHEET_NAME = "RSVP";
const HEADERS = ["Timestamp", "Name", "Attending", "Guests", "Wish", "Invited As"];

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const params = (e && e.parameter) || {};
    const sheet = getSheet();

    const row = [new Date()];
    for (let i = 1; i < HEADERS.length; i++) {
      row.push(params[HEADERS[i]] || "");
    }
    sheet.appendRow(row);

    return json({ result: "success", row: sheet.getLastRow() });
  } catch (error) {
    return json({ result: "error", error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = headerRange.getValues()[0];
  const needsHeaders = HEADERS.some(function (h, i) { return current[i] !== h; });

  if (needsHeaders) {
    headerRange
      .setValues([HEADERS])
      .setFontWeight("bold")
      .setBackground("#E8A9A9")
      .setFontColor("#2E3B46");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm");
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor (▶ Run → testRsvp) to check the sheet is writable. */
function testRsvp() {
  const res = handleRequest({
    parameter: {
      Name: "Test Guest",
      Attending: "Yes",
      Guests: "2",
      Wish: "Congratulations!",
      "Invited As": "Mr. Test",
    },
  });
  Logger.log(res.getContent());
}
