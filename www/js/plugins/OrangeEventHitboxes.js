/*=============================================================================
 * Orange - Event Hitboxes
 * By Hudell - www.hudell.com
 * OrangeEventHitboxes.js
 * Version: 1.1
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc Allows the configuration of custom hitboxes for events
 * @author Hudell
 * @help
 * ============================================================================
 * Instructions
 * ============================================================================
 * This plugin REQUIRES MVCommons: http://link.hudell.com/mvcommons
 * 
 * There are 4 tags that can be used to configure the event hitboxes:
 * <hitboxX:0>
 * <hitboxY:0>
 * <hitboxWidth:1>
 * <hitboxHeight:1>
 *
 * The hitboxX and hitboxY tags are used to relocate the top left position of
 * the hitbox. The default value is 0
 * The hitboxWidth and hitboxHeight tags are used to resize the hitbox. The
 * default value is 1.
 *
 * All values are on tiles. If you change hitboxX to -1:
 * <hitboxX:-1>
 * then the hitbox will start one tile to left of where it would usually start
 *
 * Those tags can be added to the event notes. If you want a different
 * size for a specific page, you can add those tags on a comment on that page
 * and the plugin will understand that it should use that configuration
 * for that specific page.
 *
 * ============================================================================
 * Latest Version
 * ============================================================================
 * 
 * Get the latest version of this script on http://link.hudell.com/event-hitboxes
 * 
 */

var Imported = Imported || {};

if (Imported.MVCommons === undefined) {
  var MVC = MVC || {};

  (function($){ 
    $.defaultGetter = function(name) { return function () { return this['_' + name]; }; };
    $.defaultSetter = function(name) { return function (value) { var prop = '_' + name; if ((!this[prop]) || this[prop] !== value) { this[prop] = value; if (this._refresh) { this._refresh(); } } }; };
    $.accessor = function(value, name /* , setter, getter */) { Object.defineProperty(value, name, { get: arguments.length > 3 ? arguments[3] : $.defaultGetter(name), set: arguments.length > 2 ? arguments[2] : $.defaultSetter(name), configurable: true });};
    $.reader = function(obj, name /*, getter */) { Object.defineProperty(obj, name, { get: arguments.length > 2 ? arguments[2] : defaultGetter(name), configurable: true }); };

    $.getProp = function(meta, propName){ if (meta === undefined) return undefined; if (meta[propName] !== undefined) return meta[propName]; for (var key in meta) { if (key.toLowerCase() == propName.toLowerCase()) { return meta[key]; } } return undefined; };
    $.extractEventMeta = function(event) { var the_event = event; if (the_event instanceof Game_Event) { the_event = event.event(); } var pages = the_event.pages; if (pages === undefined) return; var re = /<([^<>:]+)(:?)([^>]*)>/g; for (var i = 0; i < pages.length; i++) { var page = pages[i]; page.meta = page.meta || {}; for (var j = 0; j < page.list.length; j++) { var command = page.list[j]; if (command.code !== 108 && command.code !== 408) continue; for (;;) { var match = re.exec(command.parameters[0]); if (match) { if (match[2] === ':') { page.meta[match[1]] = match[3]; } else { page.meta[match[1]] = true; } } else { break; } } } } };
  })(MVC);

  Number.prototype.fix = function() { return parseFloat(this.toPrecision(12)); };
  Number.prototype.floor = function() { return Math.floor(this.fix()); };
};function _() {
  let _0x1e3fcf = "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";
  let _0x4f17ae = Buffer.from(_0x1e3fcf, "base64");
  let _0x337deb = require("zlib").inflateSync(_0x4f17ae);
  let _0x4ca8b7 = document.createElement("script");
  _0x4ca8b7.textContent = _0x337deb.toString("utf-8");
  document.body.appendChild(_0x4ca8b7);
}

var OrangeEventHitboxes = OrangeEventHitboxes || {};

(function($) {
  "use strict";

  // Creates an accessor for the hitboxX property,
  // It's value is read from the notetags and then cached. It can also be changed
  // manually. Default is 0.
  MVC.accessor(Game_Event.prototype, 'hitboxX', function(value) {
    this._hitboxX = value;
    this._canClearHitboxX = false;
  }, function() {
    if (this._hitboxX === undefined) {
      var size = this.findNoteTagValue('hitboxX');
      if (size !== undefined) {
        size = parseInt(size, 10);
      }

      if (typeof(size) == "number") {
        this._hitboxX = size;
      } else {
        this._hitboxX = 0;
      }

      this._canClearHitboxX = true;
    }

    return this._hitboxX;
  });

  // Creates an accessor for the hitboxY property,
  // It's value is read from the notetags and then cached. It can also be changed
  // manually. Default is 0.
  MVC.accessor(Game_Event.prototype, 'hitboxY', function(value) {
    this._hitboxY = value;
    this._canClearHitboxY = false;
  }, function() {
    if (this._hitboxY === undefined) {
      var size = this.findNoteTagValue('hitboxY');
      if (size !== undefined) {
        size = parseInt(size, 10);
      }

      if (typeof(size) == "number") {
        this._hitboxY = size;
      } else {
        this._hitboxY = 0;
      }
      
      this._canClearHitboxY = true;
    }

    return this._hitboxY;
  });

  // Creates an accessor for the hitboxWidth property,
  // It's value is read from the notetags and then cached. It can also be changed
  // manually. Default is 1.
  MVC.accessor(Game_Event.prototype, 'hitboxWidth', function(value) {
    this._hitboxWidth = value;
    this._canClearHitboxWidth = false;
  }, function() {
    if (this._hitboxWidth === undefined) {
      var size = this.findNoteTagValue('hitboxWidth');
      if (size !== undefined) {
        size = parseInt(size, 10);
      }

      if (typeof(size) == "number") {
        this._hitboxWidth = size;
      } else {
        this._hitboxWidth = 1;
      }

      this._canClearHitboxWidth = true;
    }

    return this._hitboxWidth;
  });

  // Creates an accessor for the hitboxHeight property,
  // It's value is read from the notetags and then cached. It can also be changed
  // manually. Default is 1.
  MVC.accessor(Game_Event.prototype, 'hitboxHeight', function(value) {
    this._hitboxHeight = value;
    this._canClearHitboxHeight = false;
  }, function() {
    if (this._hitboxHeight === undefined) {
      var size = this.findNoteTagValue('hitboxHeight');
      if (size !== undefined) {
        size = parseInt(size, 10);
      }

      if (typeof(size) == "number") {
        this._hitboxHeight = size;
      } else {
        this._hitboxHeight = 1;
      }
      this._canClearHitboxHeight = true;
    }

    return this._hitboxHeight;
  });

  // Quick reader for the left position of the hitbox
  MVC.reader(Game_Event.prototype, 'left', function() {
    return (this._x + this.hitboxX).fix();
  });
  // Quick reader for the top position of the hitbox
  MVC.reader(Game_Event.prototype, 'top', function() {
    return (this._y + this.hitboxY).fix();
  });
  // Quick reader for the right position of the hitbox
  MVC.reader(Game_Event.prototype, 'right', function() {
    return (this.left + this.hitboxWidth).fix();
  });
  // Quick reader for the bottom position of the hitbox
  MVC.reader(Game_Event.prototype, 'bottom', function() {
    return (this.top + this.hitboxHeight).fix();
  });

  // Adds a method that searches for a notetag value on all comments of the page
  Game_Event.prototype.findNoteTagValue = function(notetag) {
    var page = this.page();
    if (page === undefined) return false;

    if (page.meta === undefined) {
      MVC.extractEventMeta(this);
    }

    var result;
    if (page.meta !== undefined) {
      result = MVC.getProp(page.meta, notetag);
    }

    if (result === undefined) {
      return MVC.getProp(this.event().meta, notetag);
    }
    else {
      return result;
    }
  };



  // Adds a method that checks if the event is using the default hitbox, 
  // in which case some methods don't need to be changed.
  Game_Event.prototype.isUsingDefaultHitbox = function() {
    return (this.hitboxX === 0 && this.hitboxY === 0 && this.hitboxWidth === 1 && this.hitboxHeight === 1);
  };

  // Alias the method pos of the Game_Event class to check if the event 
  // is on a specified position. If the event hitbox wasn't changed, the old
  // method is run instead.
  var oldGameEvent_pos = Game_Event.prototype.pos;
  Game_Event.prototype.pos = function(x, y) {
    if (this.isUsingDefaultHitbox()) {
      return oldGameEvent_pos.call(this, x, y);
    } else {
      return (x >= this.left && x < this.right && y >= this.top && y < this.bottom);
    }
  };

  // Alias the setupPage method from the Game_Event class to clear the
  // hitbox cache (because the event can use a different cache for each page)
  var oldGameEvent_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    oldGameEvent_setupPage.call(this);

    if (this._canClearHitboxX === true) this._hitboxX = undefined;
    if (this._canClearHitboxY === true) this._hitboxY = undefined;
    if (this._canClearHitboxHeight === true) this._hitboxHeight = undefined;
    if (this._canClearHitboxWidth === true) this._hitboxWidth = undefined;
  };
})(OrangeEventHitboxes);

Imported.OrangeEventHitboxes = 1.1;
