/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Helpers for converting FROM vscode types TO ts types
 */

import * as vscode from 'vscode';
import * as Proto from '../protocol';

export namespace Range {
  export const fromTextSpan = (span: Proto.TextSpan): vscode.Range =>
    new vscode.Range(
      Math.max(0, span.start.line - 1),
      Math.max(span.start.offset - 1, 0),
      Math.max(0, span.end.line - 1),
      Math.max(0, span.end.offset - 1),
    );

  export const toFileRangeRequestArgs = (
    file: string,
    range: vscode.Range,
  ): Proto.FileRangeRequestArgs => ({
    file,
    startLine: range.start.line + 1,
    startOffset: range.start.character + 1,
    endLine: range.end.line + 1,
    endOffset: range.end.character + 1,
  });

  export const toFormattingRequestArgs = (
    file: string,
    range: vscode.Range,
  ): Proto.FormatRequestArgs => ({
    file,
    line: range.start.line + 1,
    offset: range.start.character + 1,
    endLine: range.end.line + 1,
    endOffset: range.end.character + 1,
  });
}

export namespace Position {
  export const fromLocation = (tslocation: Proto.Location): vscode.Position =>
    new vscode.Position(tslocation.line - 1, tslocation.offset - 1);

  export const toLocation = (vsPosition: vscode.Position): Proto.Location => ({
    line: vsPosition.line + 1,
    offset: vsPosition.character + 1,
  });

  export const toFileLocationRequestArgs = (
    file: string,
    position: vscode.Position,
  ): Proto.FileLocationRequestArgs => ({
    file,
    line: position.line + 1,
    offset: position.character + 1,
  });
}

export namespace Location {
  export const fromTextSpan = (
    resource: vscode.Uri,
    tsTextSpan: Proto.TextSpan,
  ): vscode.Location =>
    new vscode.Location(resource, Range.fromTextSpan(tsTextSpan));
}

export namespace TextEdit {
  export const fromCodeEdit = (edit: Proto.CodeEdit): vscode.TextEdit =>
    new vscode.TextEdit(Range.fromTextSpan(edit), edit.newText);
}
