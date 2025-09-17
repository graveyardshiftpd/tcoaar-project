//=============================================================================
// Plugin to change the number of lines in the message window
// FTKR_MessageWindowLines.js
// Plugin No.: 62
// Author: Futokoro
// Created: 2018/01/05
// Last Updated: 2018/04/28
// Version: v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_MWL = true;

var FTKR = FTKR || {};
FTKR.MWL = FTKR.MWL || {};

//=================================================================================
/*:
* @plugindesc v1.1.2 Plugin that changes the number of lines in the message window
* @author ふところ
*
* @help
*-----------------------------------------------------------------------------
* Overview
*-----------------------------------------------------------------------------
* Executing the following plugin command will change the number of lines displayed in the message window to n.
*
* MWL_ChangeLines n
* MWL_CHANGE_LINES n
*
* If two or more "Show Text" event commands are executed consecutively,
* the contents of the consecutive "Show Text" commands will be concatenated and displayed in the window and a new page will be inserted according to the changed number of lines.
*
*
* Note that if multiple "Show Text" commands are linked,
* window settings (such as face image and display position) will only be reflected by the first "Show Text" command.
*
* It can also be linked with the "Scrolling Text Display" command.
* While changing the number of lines, executing the "Scrolling Text Display" command
* will cause the text to be displayed in the message window.
*
* The changed number of lines will be restored to its original value by executing the following plugin command.
*
* MWL_Reset_Lines
* MWL_RESET_LINES
*
*
* Example) If you configure the event as follows:
*
* ◆Plugin Command: MWL_Change_Lines 7
* ◆Text: None, Window, Bottom
* : : Line 1
* : : Line 2
* : : Line 3
* : : Line 4
* ◆Text: None, Window, Bottom
* : : Line 5
* : : Line 6
* : : Line 7
* : : Line 1 of the next page
* ◆Plugin Command: MWL_Reset_Lines
*
* When this event is executed, a 7-line message window will display the entire contents of the first sentence and the first three lines of the second sentence.
* After a page break, the fourth line of the second sentence will be displayed.
*
*
*-----------------------------------------------------------------------------
* Setup Instructions
*-----------------------------------------------------------------------------
* 1. Add this plugin to the Plugin Manager.
*
*
*-----------------------------------------------------------------------------
* Conflict Prevention
*-----------------------------------------------------------------------------
* 1. When using with MessageWindowPopup.js, use it as follows:
*
* 1. Place this plugin at the bottom in the Plugin Manager.
*
* 2. When changing the number of lines displayed with the balloon enabled,
* be sure to match the link between the text display command and the number of lines displayed.
*
* Example: To change the number of lines displayed to 6, configure the event as follows:
* ◆Plugin Command: MWL_ChangeLineCount 6
* ◆Text: None, Window, Bottom
* : : Line 1
* : : Line 2
* : : Line 3
* ◆Text: None, Window, Bottom
* : : Line 4
* : : Line 5
* : : Line 6
* ◆Text: None, Window, Bottom
* : : Line 1 of Page 2
* : : Line 2
* : : Line 3
* ◆Plugin Command: MWL_ResetLineCount
* As shown above, the first line of the new page must be the first line in the text display command.
*
*
* Incorrect Example) In the example below, the second page cannot be displayed.
* ◆Plugin Command: MWL_ChangeLineCount 6
* ◆Text: None, Window, Bottom
* : : Line 1
* : : Line 2
* : : Line 3
* : : Line 4
* ◆Text: None, Window, Bottom
* : : Line 5
* : : Line 6
* : : Line 1 of Page 2
* : : Line 2
* ◆Text: None, Window, Bottom
* : : Line 3
* ◆Plugin Command: MWL_ResetLineCount
*
*-----------------------------------------------------------------------------
* About the License of This Plugin (License)
*-----------------------------------------------------------------------------
* This plugin is released under the MIT License.
* This plugin is released under the MIT License.
*
* Copyright (c) 2017 Futokoro
* http://opensource.org/licenses/mit-license.php
*
*
* Plugin Publisher
* https://github.com/futokoro/RPGMaker/blob/master/README.md
*
*
*-----------------------------------------------------------------------------
* Change History
*-----------------------------------------------------------------------------
*
* v1.1.2 - 2018/04/28: Bug Fixes
* 1. Fixed an issue where the message window display position did not adjust to the window size after changing the number of lines.
*
* v1.1.1 - 2018/02/03: Processing Review
* 1. To prevent conflicts, the window size change process and the linked text display event processing were reviewed.
* *
* v1.1.0 - 2018/01/06: Feature Added
* 1. When changing the number of lines, if you execute "Scroll Text Display"
* , it will now be displayed in the message window.
*
* v1.0.0 - 2018/01/05: First version created
*
*-----------------------------------------------------------------------------
*/
//=============================================================================

(function() {

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    var setArgNumber = function(arg) {
        try {
            var arg = convertEscapeCharacters(arg);
            return Number(eval(arg));
        } catch (e) {
            console.error(e);
            return 0;
        }
    };
    
    var isExistPlugin = function(pluginName) {
        return Object.keys(PluginManager.parameters(pluginName)).length > 0;
    };

    var MessageWindowPopup = isExistPlugin('MessageWindowPopup');

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _MWL_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _MWL_Game_Interpreter_pluginCommand.call(this, command, args);
        if (!command.match(/MWL_(.+)/i)) return;
        command = (RegExp.$1 + '').toUpperCase();
        switch (command) {
            case '行数変更':
            case 'CHANGE_LINES':
                $gameParty.setMwlMessageLines(setArgNumber(args[0]));
                break;
            case '行数リセット':
            case 'RESET_LINES':
                $gameParty.resetMwlMessageLines();
                break;
        }
    };

    Game_Interpreter.prototype.continueAddMwlMessages = function() {
        var count = 0;
        while ([105, 405, 101, 401].contains(this.nextEventCode())) {  // Text data
            if (MessageWindowPopup && count >= $gameParty.mwlMessageLines()) {
                break;
            }
            if ([101, 105].contains(this.nextEventCode())) {
                this._index++;
                continue;
            }
            this._index++;
            count++;
            $gameMessage.add(this.currentCommand().parameters[0]);
        }
    };

    var _MWL_Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        if (!$gameMessage.isBusy() && $gameParty.mwlMessageLines()) {
            $gameMessage.setFaceImage(this._params[0], this._params[1]);
            $gameMessage.setBackground(this._params[2]);
            $gameMessage.setPositionType(this._params[3]);
            this.continueAddMwlMessages();
            switch (this.nextEventCode()) {
            case 102:  // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103:  // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104:  // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
            }
            this._index++;
            this.setWaitMode('message');
            return false;
        } else {
            return _MWL_Game_Interpreter_command101.call(this);
        }
    };

    var _MWL_Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
    Game_Interpreter.prototype.command105 = function() {
        if (!$gameMessage.isBusy() && $gameParty.mwlMessageLines()) {
            this.continueAddMwlMessages();
            switch (this.nextEventCode()) {
            case 102:  // Show Choices
                this._index++;
                this.setupChoices(this.currentCommand().parameters);
                break;
            case 103:  // Input Number
                this._index++;
                this.setupNumInput(this.currentCommand().parameters);
                break;
            case 104:  // Select Item
                this._index++;
                this.setupItemChoice(this.currentCommand().parameters);
                break;
            }
            this._index++;
            this.setWaitMode('message');
            return false;
        } else {
            return _MWL_Game_Interpreter_command105.call(this);
        }
    };

    //=============================================================================
    // Game_Party
    // メッセージスプライトを設定する
    //=============================================================================
    
    Game_Party.prototype.setMwlMessageLines = function(lines) {
        this._mwlMessageLines = lines;
        this._requestResetWindowSize = true;
    };

    Game_Party.prototype.resetMwlMessageLines = function() {
        this._mwlMessageLines = 0;
        this._requestResetWindowSize = true;
    };

    Game_Party.prototype.mwlMessageLines = function() {
        return this._mwlMessageLines;
    };

    Game_Party.prototype.isRequestResetWindowSize = function() {
        return this._requestResetWindowSize;
    }

    Game_Party.prototype.clearRequestResetWindowSize = function() {
        this._requestResetWindowSize = false;
    };
    
    //=============================================================================
    // Window_Message
    //=============================================================================

    var _MWL_Window_Message_numVisibleRows = Window_Message.prototype.numVisibleRows;
    Window_Message.prototype.numVisibleRows = function() {
        return $gameParty.mwlMessageLines() || _MWL_Window_Message_numVisibleRows.call(this);
    };

    Window_Message.prototype.setMWLWindowSize = function() {
        if ($gameParty.isRequestResetWindowSize()) {
            this.y = this._positionType * (Graphics.boxHeight - this.windowHeight()) / 2;
            this.move(this.x, this.y, this.windowWidth(), this.windowHeight());
            this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
            $gameParty.clearRequestResetWindowSize();
        }
    };
    
    var _MWL_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _MWL_Window_Message_updatePlacement.call(this);
        this.setMWLWindowSize();
    };

}());//EOF
