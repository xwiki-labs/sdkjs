"use strict";
/**
 * User: Ilja.Kirillov
 * Date: 10.06.2016
 * Time: 15:31
 */

/**
 * Специальный класс-обработчик команд в автофигурах
 * @param {CDocument} LogicDocument - Ссылка на главный документ.
 * @param {CDrawingsObjects} DrawingsObjects - ССылка на объект, работающий с автофигурами
 * @constructor
 * @extends {CDocumentControllerBase}
 */
function CDrawingsController(LogicDocument, DrawingsObjects)
{
	CDrawingsController.superclass.constructor.call(this, LogicDocument);

	this.DrawingObjects = DrawingsObjects;
}
AscCommon.extendClass(CDrawingsController, CDocumentControllerBase);

CDrawingsController.prototype.CanTargetUpdate = function()
{
	return true;
};
CDrawingsController.prototype.RecalculateCurPos = function()
{
	this.DrawingObjects.recalculateCurPos();
};
CDrawingsController.prototype.GetCurPage = function()
{
	var ParaDrawing = this.DrawingObjects.getMajorParaDrawing();
	if (null !== ParaDrawing)
		return ParaDrawing.PageNum;

	return -1;
};
CDrawingsController.prototype.AddNewParagraph = function(bRecalculate, bForceAdd)
{
	return this.DrawingObjects.addNewParagraph(bRecalculate, bForceAdd);
};
CDrawingsController.prototype.AddInlineImage = function(nW, nH, oImage, oChart, bFlow)
{
	return this.DrawingObjects.addInlineImage(nW, nH, oImage, oChart, bFlow);
};
CDrawingsController.prototype.AddOleObject = function(W, H, nWidthPix, nHeightPix, Img, Data, sApplicationId)
{
	this.DrawingObjects.addOleObject(W, H, nWidthPix, nHeightPix, Img, Data, sApplicationId);
};
CDrawingsController.prototype.AddTextArt = function(nStyle)
{
	// ничего не делаем
};
CDrawingsController.prototype.EditChart = function(Chart)
{
	this.DrawingObjects.editChart(Chart);
};
CDrawingsController.prototype.AddInlineTable = function(Cols, Rows)
{
	this.DrawingObjects.addInlineTable(Cols, Rows);
};
CDrawingsController.prototype.ClearParagraphFormatting = function()
{
	this.DrawingObjects.paragraphClearFormatting();
};
CDrawingsController.prototype.Remove = function(Count, bOnlyText, bRemoveOnlySelection, bOnTextAdd)
{
	return this.DrawingObjects.remove(Count, bOnlyText, bRemoveOnlySelection, bOnTextAdd);
};
CDrawingsController.prototype.GetCursorPosXY = function()
{
	return this.DrawingObjects.cursorGetPos();
};
CDrawingsController.prototype.MoveCursorToStartPos = function(AddToSelect)
{
	if (true === AddToSelect)
	{
		// TODO: Пока ничего не делаем, в дальнейшем надо будет делать в зависимости от селекта внутри
		//       автофигуры: если селект текста внутри, то делать для текста внутри, а если выделена
		//       сама автофигура, тогда мы перемещаем курсор влево от нее в контенте параграфа и выделяем все до конца
	}
	else
	{
		this.LogicDocument.controller_MoveCursorToStartPos(false);
	}
};
CDrawingsController.prototype.MoveCursorToEndPos = function(AddToSelect)
{
	if (true === AddToSelect)
	{
		// TODO: Пока ничего не делаем, в дальнейшем надо будет делать в зависимости от селекта внутри
		//       автофигуры: если селект текста внутри, то делать для текста внутри, а если выделена
		//       сама автофигура, тогда мы перемещаем курсор влево от нее в контенте параграфа и выделяем все до конца
	}
	else
	{
		this.LogicDocument.controller_MoveCursorToEndPos(false);
	}
};
CDrawingsController.prototype.MoveCursorLeft = function(AddToSelect, Word)
{
	return this.DrawingObjects.cursorMoveLeft(AddToSelect, Word);
};
CDrawingsController.prototype.MoveCursorRight = function(AddToSelect, Word, FromPaste)
{
	return this.DrawingObjects.cursorMoveRight(AddToSelect, Word, FromPaste);
};
CDrawingsController.prototype.AddToParagraph = function(oItem, bRecalculate)
{
	if (para_NewLine === oItem.Type && true === oItem.Is_PageOrColumnBreak())
		return;

	this.DrawingObjects.paragraphAdd(oItem, bRecalculate);
	this.LogicDocument.Document_UpdateSelectionState();
	this.LogicDocument.Document_UpdateUndoRedoState();
	this.LogicDocument.Document_UpdateInterfaceState();
};

