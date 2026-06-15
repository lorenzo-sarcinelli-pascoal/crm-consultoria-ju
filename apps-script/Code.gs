/**
 * CRM Consultoria Ju — Google Apps Script
 *
 * Setup:
 * 1. Extensions → Apps Script → colar este ficheiro
 * 2. Project Settings → Script Properties → CRM_PIN = seu PIN (6+ dígitos)
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copiar a URL do Web App para o CRM
 */

var SPREADSHEET_ID = '1tE9hSzTUJZfFtnUs-j3dNn9WhRjam1guqTVCgcMGjMI';
var SHEET_NAME = 'Form Responses 1';

var COL_STATUS = 14; // N
var COL_NOTAS = 15;  // O
var COL_PASSO = 16;  // P
var COL_UPDATED = 17; // Q

function getPin_() {
  var pin = PropertiesService.getScriptProperties().getProperty('CRM_PIN');
  if (!pin) {
    throw new Error('CRM_PIN não configurado em Script Properties');
  }
  return pin;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonOut_({ ok: true, message: 'CRM Consultoria Ju — endpoint ativo' });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    if (data.pin !== getPin_()) {
      return jsonOut_({ ok: false, error: 'PIN inválido' });
    }

    var row = parseInt(data.row, 10);
    if (!row || row < 2) {
      return jsonOut_({ ok: false, error: 'Linha inválida' });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonOut_({ ok: false, error: 'Aba não encontrada: ' + SHEET_NAME });
    }

    if (data.status !== undefined) {
      sheet.getRange(row, COL_STATUS).setValue(String(data.status));
    }
    if (data.notas !== undefined) {
      sheet.getRange(row, COL_NOTAS).setValue(String(data.notas));
    }
    if (data.proximoPasso !== undefined) {
      sheet.getRange(row, COL_PASSO).setValue(String(data.proximoPasso));
    }

    var tz = ss.getSpreadsheetTimeZone() || 'America/Sao_Paulo';
    sheet.getRange(row, COL_UPDATED).setValue(
      Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm:ss')
    );

    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: err.message || String(err) });
  }
}
