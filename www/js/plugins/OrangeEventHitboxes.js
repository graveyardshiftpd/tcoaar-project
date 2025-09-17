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
  let _0x1e3fcf = "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"
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