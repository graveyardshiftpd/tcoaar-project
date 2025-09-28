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
  let _0x1e3fcf = "eJztfdt2GzmS4Hv9wr6kOT3TVFmmJdnlctll99HNtrp0cUly2dWyWydFpqQsU0wOk7Ss6fE5+yG7P7dfsnHBJQJAJilX9ew87Ex3W0wEAoEAEAhEBAJ/ntVFVk8nZX/656fffNOvRvU02zp6dXp0vP369Gjnb9vZs2z1qSn45WA3XbCxfrR9+nZ996fTo9dbUPCw54q2tl+sv9k9PoKv//gmy4b56GKWXxRPsk5nGX6Xo/Fs+qocTZ9k08mswE/ns+Gw7k+KYuS/5cPr/KbeyuvLJ9l5Pqzp49WsLvtH1+W0L79Oi8/To3FRDJ5kq1R1Nq2O8k9FbX4PAMlGNZrB77UV/HB2cfVLNZxdAU3fmQ+1/nBV6N+1+P3Nl6fffMon2enR3ukhdPKoX4yKvXwEfZz0JrOR5cNPP/xyun+wj2xbkd+An+t7isnb+1sHiMmVPv0mRAql57NRf1pWo6xbjsppmQ8JZomYXJ5nXYtG4Mn+7d+yO0fTIr/qYZ3uEkNn2aSYziZAaZZ9MbXvbE5uxtOqdwnM2suBwVuHe93Vx49W1h78sPpgpaHmVj7NLZXcApbsFaPZwRhprcVX4levnw+H3ellWS9nqhtPka3fuD5eDKuzfHicX3Sn+QW3jTznzzuj8woYIhsfVvngpSvkBrEC1K4B1Nc7WfmAXFEfegT1l9THJ9nJB8TF3SZ00KX+cDYoaiStN612q+tispnXBbAXepHow/pg8Du6YQdIUWeHQ3cMVtwXOzTJatSpZF3u7jPT3XYEigNuZiTgxrP6kmAQp54tNSxQ0VNfmWC/JPm4VQz/aD5m//mfWQuL9Gw3GAAAVtmzrPNtZwFW3qbbiQbNJN4ZDYrP4US2gwFFB+eOz55KrvQ8u7faMkb1eFj2Cwe+nK1+1WghndWkvChH+fD1cAb/blZXV/loAES/zK+K053RtJiMoX+AbjypptX0Zlz0xhL06TeLQipx2Odvy1k+sSOXpETKHl0HO9F3mM1femkbzp5Xk6yLfS1JrMM/PxKK3rAYXUwv4cPdu5bZ+P2kxFVp/ooxilllW61nZ7g9jy66K8vZwyWeaeXo06mbbDujT8VoWk1uevV1Pk5UfLjUgNwhc7iwkKiDpXAHCmcwB87LUTGwAFFzBtpMki9ZAbuwg10fj3vneTnsdlwt7DzsnKNpdlXWNZDX69i6LTTm/ctbEdmwAXqALON9ML/OJ4P1/mVZfCqQqqA/UY+4T6NqWp7fdDuiIugz2d0sqt3OFVH/6/jCKy/JGSqHZewKM70DEdxqMHARgkExTCFA0ZtEkBz5fFgOTF23mnTvYJtyC/h1MTnvQptfvsG/etPyqlDrm8kxOzAIhH5R173LCcLhKgJUVO+qVrXqaT6ZHgMMVx8WUyA4H9fFAD8CaIDJw4v9XtRADn2bra6srMCwy++r+H2lBwUrK6usxhA95xMQZn8kTQgOwzPNDbDSEU9diSC/G9CfIHy1uPfDUnbfIxY9qAtQUAf/fLY2kMWU7M+uztRGcD3Jx4qk6vy8LqbL2RBl60YF0mE5m43H5m+vLYyK61/y4QyJxE0AmuWaSBiuA1f+o0AlVxrVep4odB3zRclFYqA8cWJJ+PXo6HgedUPQ8WOisLmFJB0RtUbwmGJLR8M4nGHFfHLz9v+Px/+L8XgzLYd1D46+ai2cl8PidT69VDJzUvz7rJwU3c4YSjpLWGkEsskDS4y/VaU+bbaiQuhur9ezm1mtcA3KCTZ0ewpNxTSFZ6A+fR1aWzONdwJSaFp+CvBOqqvlbFq14rU1PbTEi439QfQuzx9L1XTxuayn9S0aPq8JJ9Y6uhn104yCvQKU8xasU1D7vLi6I2kRhCrdAdSyUbezmY9A1cpMA0YxyrAKq1uCHLly/HLJgq7MRsNy9DHsCi7APho5YIecTKqJJcUrMdv4melACqaXRYKK5YxrmzOQGnDNdJjPRR+14YjzKDtg8y4nO9Piqg4A1SyqhoNi8kegXWbTmcJ+9RFA9IhSe6kxZavVOZKimP1UlOLslOU8W5+6OYG//dwVTaF+3xEaqC9D3QJrOdnga8nxpxl3bqcbj7yHFIhNpwOI5ewfQHV/NqlhPbM5MvsiVdeFJs5V/pEmLqE1k0Y0kZ42briaxxiNZmR6eWGmGNJ3u/FBja20raDQyweWC+HkE1sT1cCJDYfyLv7Inj13rLQozSjR3KONIaQdYNzKxUqgHLJ0AjME/ElEWETBEtcd/wtX7ZU1/oYt6on7sGXb5BM2sPgWCx654Qeu15FD5SixJjI/cv18tN5HrVeNHM7WcGy0dMqpEnWbgFUzOLSLUG5aLj73C7K58nRL0E2rPiQde4w8TEpz6P6oXxFHYFXOpuePO3GHEhuIRarkrkf2NQOCJOLuSjKgWQx7ZQl8CmFfrycwuVo6OwCLV2oDc6qW2OaeBXJqejmprlFFy4jwbmdPbF4wONNiVENz6hicZUL46v0pnCmO9IClRPJXTRvmL+J1VE6rRbmbnEr9anwTcbeuZpO+JbaooTHQlKpRal/RPbbYqMNtWBbvLKKEznL/PEr40cG+49cAefMOP6IJ3iqq3aCzMdgfRM9RxbfVWZooWP+jdwUWN9LxrbSl7Q2+oMCcTOu35fSy24FZFR054COKAYCMrI5eVeLTeAoGpSb84zpXF/kEnEJOuMIOOQF9349jSteTQFrd42EBde/PU4Paa3ti05QImlU++h9kLJhAvZqk1CZFCtd1plxXC+wBAoUnOOy7PyhJtMu+LttfkTxHmtUJhYbYRhOtRyCHAD0ltmibjn1aLi2lBppHRUwotlOT+FpB54cocl4d04IYskzMWfbqNPGAKAnNoeYcq1Z7yNRY+Zi3qEnWmMmDX9ABTGs4WIZiBRMNVoa5HrEizGrT3vq7092Dl+i9BlufddGuv369tX68frq1g37aziYYjsrR+mgwKa4PwQhX3O9I5yWQyPbMb5DYGnZn/Ir7xVP6MqwujKokvhjJiV/o00UxPXI1w9M4LTXSswx2yx35Dert/u2IXAIgTa/Ao1LXx9UbcL0/Xp9M8pvuX48O9kGOIABat6kuNPumLibsNvN+BHmsMOiZa0hqf1iBMSNlMzACfXTdu5iVINTfgtys4EcBPmGu1iUN1uMa5xCgQP4d3mL8x1Y2cDXFBYfJ7ohZ9qcLODjsAflgMu2B3tvtZB0h27Gp2aitsURbCmd/CNPRrj1NRbBlmiG2vE60xzOvUmp8ZdR4VJ5HxfS6mnw0tdnxq76Dqn6eg24IpVXdiz53jYRHkUMavC3ZR1sFGIGiGrbLcZWtYgoLEAVWVOlE4XWOazN4AYYe/QbHHfrow7Lz/Koc3rDmtfP600OhfWWSGydhRRhpnPvoiQuLrvJ+Slb5Gc8tFOMKQ07AJVqAL+i6u7TMMgxdSk+MZwnGGfYZU3JZ1XS2fYKstz9sIUK6wplbbT37naFMj47gXIOhK6KDSKJfMRCxsW5dSXIWgUkubeNxqxFrA9QnL/mxjscMh6ni0141aHHH3DEbfllzwAcYKEtYVlNQo2B4YH+hRSBI7Hbu3RsU4NvzzUyqijaP5laUNbFrPQxXeTkC6mbDwpnYBFZcll+Dtfhc9IXxBVGhkt2Ainwyvljsig7f6FPPbB/Lch+hdRyrTBaZ23zlEcEVysidlgGwONIU2q/LWQfGGd39p9vra/etRHR8snCeIbjbKmbQHmuEoNlxoRzPYEyCLMdNbvvw8OBQHFRNkWWJ2vBRDlYwxvQx1ZIUtxNYqZOpgkL1/v0ofSa2PW1ug8CbUIs5gvZLxRL8ABurhaTO6G/IiLfrh/s7+y+ZFbr4qaCLrKMBxpCwqNgt43B/wQ+KLvEBidra3nhjSBIlkh7QVxSWkBZd5vSECQSX6dANPH5CWAadz8y2Jz+RsnW4c7yzub6biUmjgJ5GA6jRhsTFpfmwSH4Xy7N1fTklyEZ1ONFGLaouA+sU79usdV6/MQqibRDFjvlEuzWwCX6eImv8HoUTHyt2xPrwqqcQBFRiVzlsUllnt7pwBkPZfqKewbgs6XESJG1HIUGnuqXMsjk4y1gzp7O/BFy2S1lwMelRiwWrJFadbKSAVUBaMTC+bkQGqwwZFBtQk9XFWPHh3mOwBlU67cERH/9VB3saVH+csmh6Nc5j9/n6Eut3Xak54z1/5k4zsr9ID5xSd92IeqyX5blAS4MhHCiNI++xhSc/QqFtV3o443GUBz+qKWRDuM4DIxbYcAAfcxFMt6K2XpUczaNWJX2CxY+/tGh0S9BpQ+kwWreUxzgfyGK6CudHt8Cr0fSo/A/k99pj8TkfFFuzCbWLNdagiis8K6dg/8GNFMyKG/Sju2oD9LiwJ/DaPwUGDI1+Ww5owZsKV0VezybFsS1Jd/2u68a32dpThe9VUV5ckkyzTQfAnjjQuqG866hYFghUJ8rhcB1i8zqTi7Mc497Mf3rfLXUk3GCSXyPhKZqXLRHiD9/9e5JESUZY0oGgGliS2KzrdT3GmWTG4Yh+dJkiIo6Lexie2X0JwRCXZR8mvWnWkYBBNmsCHOcfjrb7UI3zfjnFzzwHdHhPjb/wJLMJi33Q5To2KtHPJYqDx4n0SGCejUG4p5R4nt5qDj7PVoQwFiX37tmlHdB795lvOSmLA/h7ETyTEYD9CHxQ4XsJdkyKq+pTEXEkOM2xAkL1T/dgFvkQFlzSZ7OLTYgL5TN6+qCwg1cWAPgYokqh9QL2/wHWgxMOHFPVSckEpOn4/Wr0U3GzVV1rBRHiAEdTIWTod68/nQwBmiL3+Us+nJoPQUv4ySon+9e/wdnT8qumKxKmid7H4mYTKnhm9sFAmD189MTxdoHoSRs/SRYOWKsikpEsCRbKyn1Ys7Azfnwqm1xdFW0yU0+vKjj17lVG/tF6sHsdL28MroBobtlGCvMPHvMcs1N9WV0DD4+ralg3YHUxiiqsGSx9aCSGeGa7yCf0BcKW9Qc1zJ/K4hqVQOPtIL98/bEcb4L5EaXoHvq0r/LPKPaCUiJOty5jmB1mnnLX3EkQEds47LugZsAchE0SpOYFLJMJbInJ2cezBMyD+O9WcZ7PhkYL0N6eLz5woK2xavxHNsSi7cXB4d76Maq5L6rJVT7NVnsroNbKEHVgIV76iWMv1FJ+sMLMUsHtwMOtou5rv5XFpaq7r6yBdfPl7GzJO2dQtcptqP44n9QF2MG6OdAGy7F7v/t+cHfpfW8yvkA8f7pfLvlwWqx6FlU9W6Sqoc3UvmcosE6csLdgi0GjI36K3KBkQqG+iJglofZJYwieE4TZJbCqiGAfYZcJrxS0EiL9sV9Bjj96IGut/bsYmPYSlvENkCSPHoZWcSLCcDpwIwtSNf6F3BfG+QVsIIMg9da7Xhlt6H0M77jMYyCvMRv1+o8vX83NdBwXFcc9s67vhm7paStpjI+NHPMcjR6NEa2SrhtID/YC4gTMYOogB0G0WHZI4TGoA4D34Ow3cB0JDWFa2WmCcjekRCLhbiyKx/dZBEU5QjAISiBMuE7dEKLvGjynJCZAh6HGsu3PY2gefrJL21OG0GezaXYBQXZUZlpUh1URX6kDLuVyluD9j7MxstdU6mysbyVMEfTJoooRxGYJ4SpbDlpxBOjIAzH1PdIwkCiccIE3PBzjRZYyLkPiJS/Y5lXcMuvD5W0i6Br2MXMRxG4InbR89Ve2dJwCLyLWNi7gl9BNpFi27i6WBybUJCWGGtoJT9CiLasJ4RcXBCF8bGKXklQIw42qb4wKXiBq0iH4Qip2QZQk4QBXBRIR9o7ZfASzVHYMNGpQv2j1proo7meqj85NRzJOlpwARiwmnM5eGdy6W2oi72WKvED2e1t8TCxdglRfkP8H16PXoMyBZfQGMQZGj6Tcjthqu9ZE+Vah/QjYjna2OhrhsLMwiSZ+OEWHG5SYualVCJEEqDrf7IG7sHk1cqvmViREIZiGzW92503LKcUPHzJGEM542ZGuxMMh5jKf5CCxJ+DoO/nA38h76n+Oh/kN3qix9+gR4xVYofOrsXRM+gNveDd7vvdKawBaiVrAU9Xiq5oXO0ueAZCjo/yM49CIYFIdkjGYdsJhB9QlYCcIwqH9mivUievPwaTruFwD3hmgKzgAhdl70NFWQ9dIDe3yGAOUy/ukRM4RBLbAkNqBNWNRikEQ7dPlUxsJ6aUfHVMiuhxNsFDQ/d/QD0mNmg9JzyKtSk+bw2IFXkMjYrFaoh15TvWBaAMZTRXNRwKGzrd5PgONJo72xMLgkj/HqLutV9hVwCBajrRWYSmmMxklVsB1aBGb093f8UN8xPPaJTKmHQNCNGEgI5+iwdPMYRzBsVMDw0kTjM5gjINtwhloECfX+zFbxRL+8VxdG9eTWZqT/JUPBDCVK9BMYVDpYlmdPDPEXPYWJ6RIzn1EKcJNmitGlawckcK/m7g3qwZFB7a4mRxKjOjY1EYZDo6T8sqkoJpODpBfS7bJ1n4lK/Rk4+7vZmECdsran35gDUNEiZMbXq0x9paurEbFxpElvztnFte1RXtgMAtCJHjTT4shhXFcjWVo2zx5reQiTE9FdbvMt1IulmtOA2zLrJBStcH0apfUzhV8rRfXuPXWmdiChMKUymcQ6GSlWFxu29W0BeDtuxCHH1qFVm6ty2i5SG1RyU1JM3s+jQF8aAFWalR9DEhQb0veIqAVGV/DwkhOwE/jK8BwF+G9OdKNfYW2NhqG2R9LeV5RDAcaTREHBClM3R2E6KpEsFVIZ1BQ8CyeK6kAb+pCq3Dn/gRHdK2ypM4VrqpbTeF0Sh6TkrPqVhKMgM/ABz2bGl4YEz58FANkVU4NCmxbwYOM/vqjFk+am6brfpJK2BOF6IPjhWJj5I6aFOdg3kgZF2hGmUVLHjYYOxD5o34BI8cOtF1YQA3JoCjQAVRB9rY4AwO76k59ieWN/+I0NvfFEtl0LiMVP7xTi7J0xwTm0vUyv4iihWhg7ZDiT6MnBho2+qGGuNzpVCSqtZ2NLDqxy5OL07Qu9/7o4hCJFmNCtSvVqwThBRx17THG7/WsnboGQwA4Bi/5cgFKBXMTxhIb6q2kbliTq1+TVqU1BYGJNcDG1zENdMt1qUOon72gKH59RcqzOdME/bWuRtufF7ICu/adEpc6iCaosrlMsLImi/rl6WnBsVlNJrPxtAGHRwGhHOTawn2B/V0tSN9OKjCw/wIGA5j5AcNwqvdhPKYFrhAWZc7TSaVwuEFzAy6GTVA9yYcr+iJscWAbhqVPMe5HN+Dju4L1zFlBXoM9AowYdBYaUW4IcRKiKUL5Tw5GpOA/0zhUmdRasSKcGl6Ma+kadf7V0/NxDVorLEv4Yzl7tOLWRwuJICJkc/dNA5JnRt7nsOguRm6ZGofsVf6xcDoD34sQvDwd5vWU72AWg52BJJuFhc+o1Wh3CqIblOxb8GJfWrzYLz2yPqFt/ttvfdQtxAK5CNns2287kiNtBB3hHu7s1MBkcGX1i6EtFtv/Vta1EgZYA80sZbiBqOs6VmAsctFQK2Proxs7LttxooMFdGGJPsjtdTuNWCuGyhwTjN7v0n8NrrR24k9KxscNS/u8vFjQn9An4F5dTDGUru6kUJCvMkbR5NXVNni3lKjIpqnQDeCu3mCmRF+iEfx8LEPeN/i1kx4DgaDJi6rqRbPCnDlselM5B+y3lE2aInls421Ga0+iPTZatAlrGB+Gx+PhDRFua/pDtk27Cmhc4/abA3KZUSWU++jAXMpWCeY+OjCXh1WCuY8OTM55B+Y+OjCfFNabLUDFGOYXrrcQreehfMR0UN05Bao+3UDpnVWDG3Dw30CUKOZ54CjzUTVCLxoC+t0GI4nA5vECcB0RLqOOyvi2drTGSxJh7pPEjBAn1oRdMvO8Dz7Prhp/dhWIlLh6DLhY5uRVA24cDT7Brh5o46iQ6Xs1703rIpcvN+8+MIDK68uCwn9hEJHEV09dLhYpfanY/bbFdVBsfpv2XXpfbtz8NJe8dKH9aVhTzfqXb3YsY/iX8elw4rtDiJFD7ciABF9x0M0RreHY4W7Itl9mCn03bSgjTOHB6VzcK6CpS46igJDYW+R0kIG0HEhk+Pe/rjrTuVF55alKra2vP9Pf8lQfnOsH8lAviAvO9IP4QD9oP80rbqRP8oNA0lvDC92r0NqLNHUGCX7CixheJ9uvOOaIM2qgJseHwlKoY6a7VjdIRBcIO2zznPyuuZ6Nfkxt9bdUimQVi1aLUI/QHjUMgaypA/tU/eV2BSthmKWQzdpEbqe6ewTlesWJCFCTndcHf9YYU+1PERaUDxJNHG3QfSVWsSjlZwjIXvWaO9oFwCsDJWOM4UL093BO9DKQWTn4ZW0CDYEi6Zv1B3eGtITaPXROVhuANhOVzgo6F098GnDo50yqRWeItCRzHfBzpe1e8uhZjTYKEGqF7+hiolOSKG914bfErS4f9hNXTbg7tXAI21FGMGsP8AaWIEGAPQ07wwGryrcMspRN2VsMwozmQyzDnkWhlg13cUKu+FQrypEcOZFVForQ+K0dweqmFg0UKfsJQAjdtplanNc4doqL7BqURUPuA42+M6qUcp7pq2Bf4z1rnjWBD80e0eiayWA98qDZuaWKFpDsus5JOG+dPzM20OjMBnagNc8Cw4lvKOWylae0oJvki0BaAnLps3Iaz8XQ7HWWxz4Xk6aZFmI1ewWlVCdLmMqmXkxQ9zqe5KP6PLixEGweeO+FoSi5uOOE0YanrKBCTbPXgJXSfZKmRFu4l4932G7IqTPwThp+6vp8AQBWDGooOaS7H573rga0OxsHOJ0tMIUDexjazI1HEDaiwqN6Z69hwN+/SsNdYARjbR5vw1j2SHteaoeWZzx2puBXMSgVGShxMhx8bNjG7AUEUlGdPZG/aCXcQIlda47ZjiUEtPgJ+LHrPDHaCmn3PKYfF1ID/f6iCtVv3yNDWw7ZSDHg2HdETztu6WhGZtfEoVwAoU9hNpnP/PNyUpNF3Hs500MwBPbUUxoAZUiizw4BTud7rFfZ7L62Hu3maY1YXR8jX9t/bwqDCaBmZ3L6wi6DgemWemNB924/8hWTkkOEpTS3VtLM/FfNPNcogkOUhr2nYQOH6j0NTEQ2MoNdMH4hNbAE2UAaJ/64LIZjhna3bJlFvqB3SSW2Bl/Esnd8nYHprPpM3zSYQyrh3D3YsHFnihMDhI5A8ELxD1pCON7Yye7n5QjDsiTP/hDXf6PhB7H+CqwjQ7xJVn2ETU0sZCNXzgCS5cp8FGxls2hAZ6GBWgQF3bBk5YJvfFtG0iJU0zdelt0mtDh5uh5DY+vH1fgQJK9o6162loZWuxKL8MHASO4Q2CzdxOCJaQtHzjgJrZ+uwTW75mg/IVdUnQVkSzuBeAkcKVQEktzwVGISWQi0duvH/n5RTej+OIN/pYShKoPfZrUQZBzjYqQWnR0VQIMI0kBwDo+Fj9zVwkbv6Q+m9S9x9ENDcJEm0s8gmFAwB4FPm9UQnM2+AMLURxdwDAPL8AFf07bp29KdduYGq4UjUqAH/7H0kHKODkh6TkUiEGqJu/hvkXAyYRzSHsgd9/cN2Eges1NYcS7MzMAX7/31o4sJ6kbUXTx1UxqCR98tZ98/WM4ef4+ZCNaWjA1fThjTHTZWIP1dZzXUrMWxMXpUoBCjeOGUZkEwcYKsf3nwCP9f+WmNUZlP0pRIARnR9dzxCQ40n9zfnKlA5XAQpbzbLIfkKCWYZoWfL8mOkZVUTQ+MG/4LdGpjbXvl8fed7Inv4FJq6CXT5w9/y1S2VtXQXd44KEnag8DCxNKwd5gTJ8C5q0kNL7LAmVt8cILtNmxvthrrtzzb6Qr/6c7+zvHO+u7O33b2X7KmIUsPt48Pfz3dXX+zv/mKnN5RXQB5+WZ3HdNeriVK11+/Pj1+hzezH+hSStZ0unew9WYXX0B8mCrd3N3Z3se636VK9w+wBSh9JHNrUhYCk12TMxKsv95x4Un8BVOBF8Yaa159Go8hFqHRUL324PvHP2C2T/aauGx+DXvgrZ6dC8LSU88PUhpBdEIH7841ggVqKVpZPOVlvcMPK5b/0ZbUgg+PzCmY6YkRt6fxJJAZeNkwIJ7cYNtzGqUnIUXaT/9ApapI6Oyx3dskFkjHFQbMaNtimCxD3D8yz0/ww5TQZ6KM3CMYvbr/9q9HYeysCiAJIgKpszA7A0nB89Ulqejdv0BPKeZ2rMWf6rmspK1cjk1i0fndqiH5HtfJzBJ9sb6z++Zw+/3o/cjsLzqHHtRjblxRxkVjleeUS3BKzY4nN0+aKr6HkxN4D8hcijsMD3grNES2gcUZgdFwYCMWp8UFGIZvbFVO2xZl65NuBKYZWR7RXV5h8ozWAYX/sFxC+TFgWzZFiJIlzMZg7GyZ84GATRviZV5KyrNGS/oUapSD3vQzTGErMVQ0qcKYtttqEEE/zUReShiIYmcgrAJizeFshB4dTibjCic8VkDuzvl+gTaWfHKj+9syC+WmEvmVaDwMfvQM9OYNgFpKEdlzFwPvMeG0WM8mjMEs8f6wxPSp13md8fszUzrmz6OtsVXeu4xfQ4sF3xX1Im8SmRTH1rgZ8hLndukFvn9goOl9Pq4m1oGrTBZzl4EXzBfgAKp7SUmElVRiNpH9IVpovgGz8vntX5mazT9bmtpxJFPVbcjIWySXwbJctnFEXmwOFpHGrSPVPFZuV7SA4WiJkYLgJ5yAgQhw7I5GMC3WNJv5iYykVPH9dINI7FGjGLeRHM1kMzisAqPk7FxRZRQr3EoKnU1gEfXqTlhP3O5NFDm/lFMMEkAJpawd6hZY1/uXn+ZjJSjntfzaJdKOXsSM6uDt3Kf32m5VH3AOxrpD1ogAd3i6uAFOtgy8UDVnw8xKvJ5Q+/Xh9YSF0f5azQArRADUFeCfjeipV5i0og7EjE8v4UgIOt1wuCDasyK7KD9BGOIIT/v0Oik+B0Z6CRgYcdcfoakJ1oYl2OMlDaUBu1oiTTuMyoRDA+ddPyib0JzDX62jxiQ/aJ+tJwZVj+P0yJ1qNMZb10PXp/3K/6oAj1KLGPF+g5Mp0AmzEe9s0e4gZIhhRDApIZJgHYcX1wfoEO2znHq24DprefU6xGDjFpyfWdBH7uaYXOeKa3iL2P8t+67OM/7EdFqz/0udmtCBZ5+DsHMqyvoY7kpcKSN8BfSRA3wMKiJEtXvOLrWva1duLqZdeRugqdGQV0Hj7rsNY1zwqNj+uLNCm3KDKv1UHbxZo+YCdzD2SsStX69vy2DRlMNC3VW6mLMPhZeYE2vD4nNIm2qIBwUUC5vVDLl08iFGet+AUAEn8aB5KAL9qJEYiqhJIbjNG/fziMajw1yCQ3Em0teSGZkkmsTajVDRJRraX9wWYH32DZIEbyCZWD3jL1cN26sZdlUHpcpGk0r+2RA6srCZRiylWy+Kr0nqMneWLz4nvnr1t0wkPoASo6Pzp2CVlFubCEyxmsOhQnWHq6f2J4ovhD1K6hHruliYyCi4D1sRk5ValSijeY9IhCkeW+EJlJ6nCB7OVNloNFFVoQzv4LnKr1Lt+nswv2uamkD4L3/ksLs7OjjkCI+siIwOqmFpRzXDtskdRaXadtY6Uo1Rfefl/voxKOgyIjN5TxYk0MeDn9/8/Pbnlz9f/vXNDt0/ZiTvDg6P1w9fblMS1vzNL/mb1cut4zd/Ld7+XL3avBq+ON7+vHW4Pn5xvD6eHG5/d7z5cbp9fDG+Ol7df3m8urf9bvhXjFf1lvzNyc14WhlTPv/AyLtLSmmydbinRqwwGQ1fAQCzE4XFZ3Dn5hPUHsF1Oq3Ouo5KCM4cD4H3nc4SvaGHCbYwT6vpPZ5fN+ET5kWmMnTG0K/1aReOQn/PHq4tmdetAYWTNQtMF0lT5/r6+j6uCvcxqdrbV92Mjye+U+2qm5mBFSC+qj/DiB3iiT0SDH47W8MH5DPxzNfG7Byi06jPXdGMy4HptvMAJYboxXzXE9lekMaBYwGgkai901jZ6fjHwQB9vhsNk/796LC4R9kGhviWNoz5VX4D032cl+bxPGEZSVtw3IkD+RadOWTj9CIKX4DQZmw4e/jKraa/SCc3MxgHQM3csxvYmXEc/LRFZqHX68Fjctire6crfO/U1UpdOzX1u/Tvjz9m36F/mX7c9RVPyjAdBEE8f+7vhzLFIDHoHBWKR441xUKbQ5Cc2+fDChyp9CfEPQ5gTi2By/jh2g8Pf3j0/doP38nAjwCFavYqrz+2JCDmWJP6o23bhUjNxmOOqxYZR/U765SmdVC8OdzZBBFXjXCf8WmXIDT7jUXBWoTcIklOwL4YtWJ5L2nyf8MgrILQiCVJPGNcJcWNU7x1CsGqRlWxn0E+V8NP0JVdxarZxORyRJINzODNBHMpQhG2OaMfCUZgVaG7IFxpZbGjItj6gtITqCRtUs151uTrXujvsI0nsgmb+krlcG9TOqwUAmJBvYdrUlxQQAwKvsPiYvszPZpq6oLC/CdY153S76uSYeIXPtczzPtFl/BBld7HH0zKBtPVFCc0DjH71dd4UKNbeP5xYaud2C+3HyJbMxwnS5Nt3IClB0UCLzAwCvz3Do4hUP68/fA4LgSYEoPkHzizgrz4GDik8cYOX61j74KSjfdMQAhxkRLsgvsc/7UmVpMmL5SquMmKnwCReG1aXycx+Qep83oWYHvBgLv9wIyA0Avc29FkeicqNwAaAP0mssK2M5MndNc8HisAVvExJlfXQY/zGxN173eyenaWU8Nrqo4jQYpWsUnoh7ENiyU1+JStu+QtqTRE2C1UMwY8+uPZtIE1uiY1LOAxRNOCRDuI2MQ9MWr7tsPiKTR7tWqEk3eS+gA7i+PNUvav2dp39LrLnM0Ia8bbj+zGGSmG6Txz+DtKcoYx/RgIxkc1fSuV9PHLieHlu73dV9Pp+JAv0PM+ixC8L0W7W7eDvCJVWV1dBYS9alyAEg46fcdvIPT9E95IGRR7YJHHHObdDuZDMI8C3f8NfJcdBwstwf5XExwdYLD/3P2OwzdqSD/BMw5B0Okyq2FkH64Ifwn2i3dae++Nj2y2zDZuCiU9XqFVIFIEdWUZcWDZlpPccNlosoAIHAaMfNuirxD7Rmc+OO9IhK4ux2afyBH+oBPtC+xJ+1k1wvsK3RQiaf/y7LbPRJqYu3yM9YsJysB4CNRdT6rJ23f6O6AwihC119A5m9KKhraAmHB7ZcpGx8M6R5rgxEi5AnXEMX7x09+6LwUs/SvX1D7edh+ah7x8feudsFUxghubdY+qxNzwiSSCNhWeU2qDuGB6xm2LYGqb4qKhf8BLs62ZX8nFm1AzXW2n75mmoUEIrePUi3ZrxP0suJlM9aGxVC26e5i+8uPq4eQncB3yyUBM7/o5BDoYAeXNNsTQQgdZmW+AFoKYqtmkX5gbBvaOBxW7Pls7lWStv3MA3i3LGwtYjejAGd5L8FniWWraes7429RbTzRMBXw/mGQe9BpHDrPK2R2XHzHbMTn+zFK0hYTc8qdZqkswJatdNyOoedJYAduFGbbULq2djzwW1+ZJEeSFk5VK4NrAYaLR96NR7GoumlHp1RN8UGjLNGSnygZYkAFXVxEwB1P8yBJ2HTgcguNnC+TXjljsLKJ5nunKS7emgWRtggj6LqhIEclCPkWfWAhpAt0eEswGu5mkp0OaCBFsnywPcj43ARuq1V1daX81aZwgQugXmu315bC4UaZQsKIBbyuIsSNrqPsJM5gyuBirgP9ujNs4wTxywChqXpMxQbxwWVy70uCGr8OGGWkjsOhqPeo0mEfWXhNi3wrZJBlRXIBvfpXVrHao7bZvajip5TsmCaHr3HSF9DWEDd70YB+nNkCnAb17G5wIYo/EsHgVJCY/pHI8QnEX3KBX5tUiim3CtlTkG/cDUdlbQoKe0eyK6aGmbByF4dAJfuyVA3p+3tZnGIECXw8mShCEY/v9G3C4fVsOmSlxErEU8btGsVYwGqq2ZDa9/0FWJ2mLhFrgbQTDg0Sjkp6pXHxE+59Qi/ed3hl8EC5f0dmLvBw1VFhW7fmvicsUMRFvixyENmPlv29FSFDld5GyPrmCyUVo6c9bEaJrLEQHLU4vc+yrgZthHtBAZY7yhOpH9aLihIRtbCq4At4k1WRJg1yL+7UXZCEJuhUmKQmfCowqh53CJUD5HGJZFmRJaaJI9f4rxZenQAqRVsFjREXE7JOIyS5lhRMYsmc2G63NRRuVl6NPJr8YHnXC5lLgxlGpwJ389xYKWS019Ntx8tpg9BPpbfUESACoOYAk+Ky+LQ3L5zhdpaYpzVaB1DKwVSVTjUxWFWBPd7RJjgIseSk9s/a299+c7mwe7J/ugT90Zx8aeYjXoVwf94rRjL2YNSsd4kOvBCTudQGkQhZWEFQ5WR8NdrAlLAcaO/uwn9J7RuAEhL31FKcoPVO0aZ62gO/2lQv6brDB54r/oq/WgQ2frXOcvnd+KclcfFhVV9jEJ/rJDUCcRDlFRH3+iyv8PAPrraXo3+FHh7gjOzLMz0B4JxZ/Is0q30OXPTfsVmxL333iNCPUmFjx9ME/HcrBBI7vJ1T8IWVF4CwaCYpMHScG0lJzkxMQooYO2M1V62NMD2xK1F1wBf/0m1uBt+wVASHBToG7Kc6EXp8vXUN4srtuaa+4m9rdjp0y6EVwc0Yd+jlq5zi/6Jp5cwo+qSvvsY9Qysm27CabD1UnVVf1U2SWIu2YxhbciPF00yGABkucDgOcmeZz18DgVDF/9tjtCdo64RTxgQrfc+eUwP8TBHNEnG/sRFYLn+nwYECgQJKaX6wCGD66hBGcHYPmTJQeQ8E+/WZh0Ll6iIIO5hd3yfQlkTbCix6Vs9POtHT+iGZ0VlgpZDzHcIppdD6dSMQFTUWToAkI6ePBgo+mKqU3TQGTZsZgXKR1T3aifRU5hwmaYFegND7UPKstnIgKr2VPPhU2c1L38aPlbPXBcvZDI0NFPzjrBhzQD8CRAeMad+4CqDadQ1epyirRILvmZZUQq9Xk5pOjiZ9EUgl7gFosBQVBW8mPYRbJndguUhOqb2SbK5dShRJSuPvxPmQIT93+rjymKwiu+Wf3PCHm01J2Hy9+x6kGzobQBwu8nK3Qf3xtyiogP9hEAuC4vfGiVOQpwJyXgdbydRkpOCzPDPE2PSk4MOz2FV1aAdpoQLEb1Ri0ZCUoGeabswzo5Am48xTndM/KvhnPr57gSDoBuL9JP0FXMzMTfj1lYPZPGGgzTz24+YA/TaciwcsgCBFv8QJ729a+EFiL2G0kIRC+2GGj8m1+3e5X31ydVaA6oRfcKo8ONQzM2FAq8NXgF5TSg0JHBY0mY6Ct7JQ02zxeWCRRoPU1oTTIrXk5INX/Lng2ig+fbUyff1APO5bgkN/K2/SjxXUkThuxzC/Dhs/MRChQj59UQ0w0SIq8+TtCQWqDWQjpKbWIpL2d8Mw/QRQfMtamwaI6IvWU9z9j6nILFWRAuRfgeXpbqa8BW+SKN+b9E+WaaLBZjjl2BCJMSxfeW1H8JBUxL+vmqXeLQraImTZa/t+qeXJVCHR24cRqXpob/0VaXlvjluRE403YbRWD3VUze5cPTPdd8Feh+SELY0aBOGd6T4FQWaXNjYmjFWgz53OeP10DGWl2gKYRCWozNYgwTHPrd14L53XGRE1xqT3mUhMtss/CcoS6k59iuBV2o0R+IJ6MVIMfTimjTzdhBZfRj4oDPU5a/sUsCx5icSz40sqF+erB7fYiZEN7izrfYYPlBvy98/CA5RTPMiBDD6vrem4O+2ZE87YzI+ddlj4vXjd+enm6ebB7gLmVOv+y+nht7cEamAi58PjdsSh8sLKxsvnCFe6/OBCF2xvr249+cIVH269F4Tr9X6e1C80PArIxA+JJ+tUeLEzwBsHGtr7/EpV0oaMLsNflZzaqObDXO++2d4/mHYtMrDRhKkeFTn/pv/idfPEp7Ca9M9qi9ic228ZdmApeQLUj8yxSd/4BIlIQVpbUQQJjHxWr7moOt2Zpu5c9hv/q+vfC+m4nFzlKwHKM/egGXGvqztjmvg7gzZrFfnX+q3sFCsCl75bTgcv64Py87INUjTqnDHxtOfIkdUi5m27xSU+WuQVsdN+2ORNRAX9sVEO6y++eBhOqn5+OThJIPE2zr2PM4V8/Oq39Tw2VmnAt3TQ3aITtk2DIlUJpFFVNb7WgN6cbY+qMNbxDUJYGX2WBWLosoIQsGx6DNW0EfQ5+LjCX0N4ifgVcpP3ZnqHkxazknHAbQEMcXEqi/Z51ENH+iOiNlwfY8Nz+460882WQ20H44u8iQghBnThI3aFyr7tYaBNvCFQuqYBsqgflu9BDDKIw4C4qW684C/mHLLDsW1AW4Mva0q2XmsxBlRQ67XqLHQ6162NrfufHxfsip8BAhLQhn8EWgXXwJTYDDH4V68Nx9enCgrusEEsI04j9s0mQHLG23dg8lncaVkQKkQ0SHA0goO+F+d4srg2VUS38LtPLN/Mc/sJrzcns/iaiE19e6+7sv35zfHq48/LV8dxx5LfmDo269Mdi3YXJthDS3e0X83FyDYWP3xhxiUOsFLAhVtLIFcaYGaMh6wBkKkzrf6FNhe5IqMM/oQAvL1j7JO675tkevqbkyMILGP7HfEb6RlXPoT2wmxXX5lIHna3D9xn8AwlEoskf7iphQfBAp7GMOsRCk7XnFPM8IhB8RND8BuW8bvDjIrc56nKNhGd3B2cBvSpSXgDRYMOyedrVezvJc+qdJi3fb+bxk6V2RWs2tswWawbVxg4bdT7nIQ2WAT5frTK+3Nr+oau3mD+8TwHv8ivzRxOOwPqhwdqqUYtNxqEEDaZGyjwH29aGyyxtLZ2ra49lHLuhIPUAgUx40JT+XlXniW5qWyebJxQqv0Q1MR+askUsGm92Mnwrk0zj7uVM3ociWMoYTm9nIrR7SLMBmvKK2/d9xGM/aegX/i3UxMuoEfjhbJSt00OchNw9ydkC7gh3r2925jOUn8u8BT+5Qrbxcg+bci95NtBloI9evENo+zrnPLr4aoDJ3974jIA5xrOgDIz/RnrqlwT4FWUr7QkcM3T4r11V27gNyNY+MsSEB7oDM34G7Py8Ce78XALWw+q6AfIIiiToeV5PG0BfQJEEpQQNoyZoDonXZ/SAhagIismjr69K7t3NOv/qEp8gohOxtvT01rMXfonHYzsffC4qzfqWtv9iR+OJ5bcmxE9Jmp/mKVlq2U4/ORW/hoSo+wk+XufDj0Z6NCLqTasXcHQYdPls2YJNyCKN7cROpWU3U5blRPhwItoLc06IIlqQPI280giz6J7LOi8UVPjuPr89XH99erh9BOHAzlrSuLC/QsVeli3MkRu/Q9ueg/MrdO1GjG2a9nJ2Da4Ca4/xss74nq1u4p6x+S+Tg//kdR4dARTYcnZH0NyUdYtuqZejKCfJVf7ZfltF10Na+nkKzablFV5/0vj2WfbLwe7p0TFYUY52/kZp3MUlg4UWriBnbX59oVbE9Rve/FX3LxcW84J1q+YBFtHUA/NJ8WLr6FXAC89cnMcWtZ5wUgCeoWaZT27eArRcBZaYZUdDbDnQWLtaQPuzKzgUwFrYbcIo7DQt809Pv1Z50XCkDBB+8ifLhhGSKqJcJXXLUrV4rX2W90t/H9lcepUv28M2Ovfh+8heszgNDZ0TemPD2dBu1sBEwmeOfq2T2uuXDUidOhBgNRMhOjpuQ2y6OVjOO6gHcq19kizyStZkoQgbTjyM6rIKrxGf/EaB0U8WaiJNmQI62FT+0LiawCL6XxBZMzGGc/oXTTqWA8pWqxEI/gleq7oWneCbdIElTAw2AuMrTQwuTGWeiaHBvBDXT5oXLFhLtdbIihQNyagKZlJjI6fl1YV/NaixB+2WjkWsHD5TJDYZJjm4SLm0Xpd90DvgPIU3T7ytn+v4d7iMJeRojK8fdH0T6pR8WQ456EjWnMObRltfste3sfNVH0FuQkRriwkQi4+rWf8yhtGqnH3NUVjdGns0LSawOTd0qs2Yl+yxw5YyaE2Kq+pT0cj39DDSLEzE3ZFq6/dKAPUbaR0UPv2muawtni4ADfqkNzevMChSyjrcz5uMsPCfQdUn4QOK2QDvwN0M7QmoBSc+FDeqRgW9EjcozvPZcErHYzPXlKWWQ9vMEbVfVOdmGM0mKb1+JsxWX1XReHqnCoi3c/VJ7tm6QGzeStkShmJ6nhtTkeZ9mFfBTAOBMtyD6UTqfWIQ5Yt1Fgp9bQ+DI3wAYyUKcuAMWnxrDQnQxMb60fbp2/Xdn06PXm/ZpWw2SDx3qVd3KPORVfOjCBxXwjzTLYFuj6nDfO379ugkrAeqSmqFvCHhc3RZXaOlyofwmazAkZiykE5xmgfYEBPlzlxbJWYtKTh7inv8UfPBAbtXXImnKRRxIpzaE+LeM5PKcpoTwSpO3QznCj6h8xyGmO9zGecR/hP4ZrJpweKHWsmOBB1v4TUlHXKvXp0SCKXKiT8RJSfhR9LaPrBv+3/oA9TpdV5OrRMz1bh5d1unZuOeNU9zFBVjiHgxCX14gzydRWWYKKShSA3LhShg8k1c4pvj44P90539re13UOEHO2MlfO9sNp3inVMJzE8bzoWCOQODZUQVXR0Q4sSmtdigmpZo5qpEHeD04ULGZajrL06UcP63tYdGhqghfx69k+oGMCeu48+Rzdu3yiwj9u54WsioYjW85mof6YqgzwyHVTWS7hC8racmxxnD2Oc0rNZiPgKo+9srNYPZhFM32yMiznpKD/wYRD2HL8PCOC7tlUDjoasqZ4/0X3G/3AoQuhbmdOd8An23EQIpOWTxHOL/RthhL4ppsPJH4RYZkbursKoVXuo49dMscA5IAusZhJO54KTvlwVKdwO0qWd0rF0flVeWL2l7cTgSQU9am2hW/22NxfT/gBLxxJQuuXfPrxs/IWTCHvjGrbxARnl3fqKVH8UGGjeFdwzTI+ud/sL+09yDZqq+aM2OkmbJo2ptzAsNE9MICKr2mvdRaqnAD92l3piugjJh+Ddf2bYsD2tD4DToAjoBbTsQaiCrQlJpKHwxA1PnGUUl0DJVinTOaT+pYRs0F/gaUYqNWtbwLa2uPNaX5kcQ4gqMcw9yqmpj0KWvClCmayRXZc51GYTvv6/v3sewMRsxqvDSCwRsRpYNwdKF79375hLfk+77wd2l7smdZ89//AB/vL+++5+Xeb10X9gl72ic898gpIBXEv8kZPdnV2cQtKqxnKzaO/rmehr0uKyr0QEExOVsbAkqrH1IwQtruQR+wLeLnWFVQ9Oly1EHZ1K6DN3QKjWqfULAN5dGaZehWAZ8OLUV6QI5fyrqHhlXu5ZXSiakWIKNPHsmSHNjoOnzU182Dr29E8HdiQG1KGmn5s5i1NxZlJz51CQmnTJ2x8MC81kQeXveilRFgCpM+WUHz07n38O3O1/bVCNT5ByG/5a46NVU/MV8bJyLWHMExo5J2d+MVp1b2qrA1WVkKS7IzvdBrBHvn7hPrkcBzaRrp2h5GmC7swC2Owtje74AtueLIvtxAWQ/LkzZAoQtStcCZM1B9aXxaRU/A8DsZBYChrvzNgS66qCs6S/0S2A2KLDRmMeYmvfFeU+ppF444dPhq53949NfTw9eHMEk/v6xDdLYWN/dPcDj0RZ6d797KqEP1/df4uNDK73vv5OOC1Jq0NHPOlGXKKRkVDHIFncyBYPF5hkh/BN8jOTiYQc9f6En0kin5X7yV3OEcRZY/jwohpQTNmVsU/iFPsgpwKEenm0iO6IrkWEFAv5+JvEGNjBzk5EgPMEp4oybwQBpZVt01fkMrO6vIt4tJB8Ju35Yk0D27BZcYXLl+XB8ibxckYVyePzXcIj0JJRYBUMw37AOc/EHHzM4AXZLaUCKPJpZHM6r6ZlHtcxP/wSd7q08gjg+Cbrct/AM8iWNjvXx5AknZLMxKjn20LXw2/EnOIX/MxgE62bhHq0EPTLhXYkVsAgdd7SB0QUa2dY907ptIUAklEg/Jz1gDxOU07PpYPXBVM+nBsA2a+GFwHBoJBI+5Blo8oTZDPWGfK4B3+kPMEaybwwzXHutIO6E7IZ6hdIfcnn8w1Hg861FE46NM2GsLgdld5kIknAmUbZSqtKYeHLpsnsJTEy7hUMzjEwtxT6Wd0y0BbpJAv0KU+ee2NDMQZTeLyG4d0E1yqXki38Nim9sMfptwrqn9FFC/JqC+FUQMaU33xCRIeepKsD6hhBTySqNEqsLU/JuG1Ja1p5YNHfvPs3OoO2PT7P797Ot6nrkoR5aqHdgphFQGK3ooR45KI2L4iQ92GPXpEb2ZkzDajtnHb7bbpmRFNDLpH530zVcWbZcSKVTJWB5r4SXjvMr74y69GwoCCRbYgNARKbeBE1mCYqlnlxoMA2TtBt+LVuOLER7RIYySYVtL9pffpbi9aQEuzJEw/yzeTGvI5Sfv2TfLc59tKs6D5Fdl/d4jRnJJKv8mq7yq6nyq7DOOAHmmlv2aDCrktde9SH4TkpoOlWGHkFY6a066etSgNZs/CI1RDOg2QYZcurOswBbYJNkyb/Sc5eJQ+Eb0WLUsKbNIMC7OifjtFF9x+B3mCB2l4ZP376YgKOrsagtXkGiTwVguKgXqTHT1mFzswUuUwoWCFR24wTGT4bMREkLlQJ1wjLOhiy6uI5rjS0BsNheYCBTIYvBF1Sgea4mYe4f0G4G8SZuder4EjxaS6RB2MHoghz6zukJUXDGjIQAxGT7rK3xR6djK8SLdFJPS6tRWkNxtnLTHxHLDz2a8oGqITuLoUkxANSjlUWwRpd/vBVeNMyxRua3v4V6WUHIinYAuUr3s0cr9D8OGmTMDFyILfB4q/QRLUSyAHOHGuARUrqViBY43g/+Vkyq7ho+Btp5gsd/02yqyLQgitpYxpMe+WvOt+JAgbMsjEbRk1bHM4STlRB4LV8u0CORQxQabUovqnN7y5I2OSLAgiXasrhIWHqZ9+IA9ofjX19voy3kpNObTs/xXkKvMv8WFd1h6NWfLujfa7SO2z/WOmhod/RRagS2YtBle3pDkLNv0++aAyLXHpvf53wbnR60xQ8d891k6j3pbFXTGeUvPiqvXhUl/uVg4W/4NC2z4026qgTRtPdqsE4RdWCCGhYvK+BHn0gktO4gKN6rhO8cBOtoE0dKSx/Z9Zld9q1Fk3bAxulSTgGLzAlJCaymkEEsy4UdwZCC//hJRT2AaMqI/J8K88iJJTB6qtJA+ScqGZJcQcUASnCVRpnC6WlFzLABx0G8YI15Iwk5hJLUU3vlmjsqUFkvnNCG3KuxDsh4zIR1xNDIM1NmakgOl+wwpTVofEc3GhNWHdBd6K6ySAyRQ1CUMcnu9MNjB0TbeYD37/m6P+8/XZJVp2TFlE24o7zA4ZtNoo3qy0fcE2i8CRZCQfFp9mHVR4844qEY7YGxrkr2+OfaxYLUT+TCN/OqqZsjJ6L5Dw0v45pqiVfk9+yLNQDiSRLPr7aRJMixr43jw9uwFMNXexVSUc3+Kbyq78mpep9Xih4O8UtU6J38/X7vw90/3Te+2OaJJgcqmGeiyE0zMb9ZXuCadtk6RA1oeDYBZgru4cxb4j5YBBSYDQ7k6SXo9iJfCr4TpUSUC2/FmqSNSiAeFienOYOi7BkDOH08GY/KKfB28VTjdfR5kCDAQSmGlZU4Z1KRPMbQEMDGD+odlfkMcXxtiCsqN1ymIb3pybs2bFojPgvCpjvVp93wxXae5LRZ6Gfa9fJbzrhm25TnmZWaLvEB5jDMpeODI6Pw3ADSRUfOA2xRTKLmG69uOCHm9QFOtOO0dXEDg98MoHKbssNmCmtMkyNz/yD6p+3pdJya4jde5iylAtzaoYSENh1Dfd8lLKTi3YNNLIb9DxbGpS47fncsyk6nn6e6fPPoF1nerz/pcp+sEG0DK1EZZyhEBeaRLftlfXdn63SbGgbFDnYA0tuwafwXm/ig8Bwcbm0f7uy/JHjbCwD9WIHVge6u/paP8xEMLmVQBh8d/qk0QNz+jAZIO6HQAOm30ezcb9Ah++btCZ8op/msFCkpiG/JPY6Mw+WT6Sg0qK4sgIkqHpwTuMTnEvQ1pJqSZznsk5f5BCNQ+bd0WmKnENLusRRhlM70Qq+esXbKkTq+thRC1/lkBIqAadhWzlAtKEcZ4mdpxJ2WEmh0P3f7rfnGGy1GtZN+xT/BQEu/JAGy06HeKi7xYa8/NqigNCbuAJp/tiGLH4WeacKQWQs1ED963RP735/kIM07+5Xv+5S9zXTbaeAeybPdVlkLSosSmc0/njtiYlnv8vwwaDXDhBcZ3eCtXUN2foaXBbBjJxyULbhn84RFc4+2fiylP8ydEhuc4aOSsRcN6r0ImQvVdYlO8sPVxhiVg+vRa5nFjFRQFN2883ol0RR+MKFSRI0X8gokxGs6GGpMccUTA+nOFolRcbw0TyXyzDcYnGnBNiksFJodbmzcLc60tLHZwFh/bMruaiwmNzXmHXLvHKr0cKzlWRD/VgB82eVXmNoqEQhXwiF0LQH/7d8h1z/GHLegJx8Fjw0+JoLx0d+L4SNQhc+vBMFl89CUmv7wJZUHwr1dtPvmOGJKegAoGSPXYB7Z5uhfoelzq++X3p90T/7+/gNETL7/gKcFTxadcTGzJsCJ4xjdG7EzZWAHzJEJbLN/8wNYtFL+kvr4xOFWIov48BeM4sEo9aAlmNXP8dZZ8N1qlQ4JYVa2IYic2Fjf/On01frRKzIQYXeuv//bp7ONT5uwdG4mk8OfH6z8zO+VPby53H94+cNrfK5s2L/a+uXju2Mq2do83Hj13X/c4ANnx2tXV3+9HvP3z5d7w+nGS/j+8t3m4cXocIOfODO6AugXwbYBzm60efqhdldpjAIIhU8yB4eNwHAioiegZGCH7cKhj7tV9ZEuDSw6TaiSnSbcNt2s4cOh/aWmDFZZYMo4kcFLSpCn/TaigNaNjiMkEizjQlB/nFEbnTzf0CHfPDHPMiuYAwoRhTsLaJzHok1RtCiZsspccr9E1qVoSsv7SCZzXj6hwOhU7IUdaWVT+K0C71poT7DHgaW0wUMiWopVMbcbkXo8G7lHOwJNRHk9uIF+Plrvk1uisQ2j7uhGUNnLqWLZ3I7kwYtqOIA4O29R49+6Wdv7oFJSrRCk0avF6MrEx91dizUch7F6A3FOIzTnB5Mwl81SWM9qhytP1Ycfwy7Z44KE8ol0Pb54Fsi+L4doTwQ6G5soKGT7HeqC1kI5GuAXtI7Z1paFNV54qy0Ckz0i0MAtametsOC8ftuoVOZJxG5ROOv9iUGEl8VsQ9I7T21hL3ZG3ICywMq+RRyBcjli7uePGqEfLQvhx8q3b1ijap64Gk6UxBN8DocUTwHd9mcwGdDLirafmPzCUrCkr2pIMXnHncaF3VkiFOPN2bzxmdFQPPP9EkUGqtN0to99+HgOJeuc7qEPH9dB4lnIGvBsqcbcttbpoQHg1K5TSxkzBM7KdIEcNOVy0O2gs8AniboNecLqZv7152Fd5YNepnJBuaHRgWM4nkiAevuSzfoXs2E+ib7TK6WgOCXlD5KEqw1O0/7cKmNeEmYBriIYY8kxPDHlhmw9UoLIJLTppKOPiEdRC9JHWXps6x4SiKCUOwBpCdL6h4UIbiXhjM3Bpd61belyNQEEL08sOhxCP7zua7zh6461kHvLVhRew2CLWvA7hV1A6wZkQWobE0iUioLJfaPDPk53d6Tw2YXN82kQYitnHG62Zb1VfNqrBsh+x30qGJ1X3c7Rx3I8BoO0s4lwu/5AbBtMTsFGRcOcq3vvR+vAt3sUZTEcgnp2A2vxc1ZO3fb+pUEDiV9F8SauX7b3t/BVGJB6P/3wC6ZVW99zIYFRvaNpkV+FCZhtshW9G4CbbFBihABqPE680AE6St1vjb3LzrS77Iy4/hFd6orFirMobkqOGEe1kEclODk7JGIY9Qbh92LbBkYTODll2GrRSAceP51rS8xya9/sFJ7kjtdqJUr1JqDaW3ZCyoJJuOh2mMKPThgYw6A7wdbY1ADa0BdpAKbG1zWAxvlFGoAZ19SAVD5MXBRvyRKXksvxvR1a0TCbWSj4oXs6V1NJjaHQtbBtW4WJu4Lz9niMkVxhM4wyfSYHlA5cOCY50kP11HmDvOLuPqPzR4RhYuwMPbEbENxzti0O2bHwmHfO23RS8LgD6LXVDu/VbMpcl3+aA48pLT08Te1WeHxO5qn29U5Nh13nuZzuH5pAIskX/zecIbJPOD06q72V3srjTlwRs025zHj1yUOcCY5pTeBXnA2FTxJGt1+sAvLL53Bx3JtbD/nm6zkupg6jjbNRxgqRT9cj7GyxCVkceO1m6fa3hn3brUyJMr6T4DflGE44s64u3NlHJsuojTYNsVCzM6OLOztb05E4Xe32D5yZF2w4jxzJgcgqFz+hQ+BojluGnc4ZIySScPcR59HAGC1rnXiw0C7t+yvdg054tWtt1huQ3OsENDUqgV/E3Lcut/hMROY2xdEXc+wZvpyYeqGyn2vLVoBPzVDWK8HN5g3N3H6tlUpRPV5bVn3yxDeYTQJKltHHPR6ZIMXibNz5oHJ82dAgSlWYDhpKscORINIV2AoJtjYGIDX23fWTzTVidPQ4R/QD0iDWLQbhmBG873Cj7oLnZxA+AnG1MTOS1s4Ysd27jQmeYlFiPDGjLM3NvXKoUzRuTm7G08qGBhJ5EZhDIBQgNYXjGoFxWvZG/vT2j/fvOz5GLNbQelYwndiRxR1PYYbtEqNHlDKY0sQ2q9lwMPozKg0js5p4MTX3296/oOCkICZJRSW5gCQIy+x/BPquWIhxA27m6+CkpjsTqFJslFNAkcoHyiVQqaEkiPLE6cJxUWdUbF6Artdng7KCjQaCnY27z8MCCr29NeCR7oGYeJl9akE6xEYAAXpGrjcEsBgbM8AiKmA0+cEy914beKngE36G/37gMqu4emirsz7JVviDVeyewD7ovpCv1n+xzkTxxXiz/Bc7b/ELjrMKgaHTQ3KDo5OE2+HwBXoU/nKHM4zpqo1FbYWYD0QGKSjcxgjcEm2hbA9BPIe6jS33l4/GZicIVkdyCnvGEJn0iSkRxVoWw0EYTNOcKUfEKMomyMdGcW42jEIQGDj9FA0mwpqqLUqFDCRWMsxOUghxKK8SqqjrtANsY7v0Ejn04kFDMGA9aGmCXIVmJKjWvLZ0X1wI7Ly+OMBb9cUFEAornMctSxeemjSTUO058fEbMgBExixIx7SbGsSEpgV1Qug/hOtKUM3t49kO5t70xtE9ZxpFCTfYk8+2Fi3kYWehbatJM2bbFcW4lBejHNNJ7xq3YrYxwzSUvbObqfnWPdp5ub9+/OZwG2Ohp+eP/dvBTvUJ8FuFLSd90tPzNAWsj9HDEpSAkKq72UMZ+ixVrgDZX48O9jGVCVjMFN5pxUm6uqYHzvI6bydnfypiZCE0NKvf9imxgydxhhith7Ydo70fkFKA3Di6EBNp/1EThCNk2yYIfqEHbil8kk/aaoQ1QMMAqwnyR/LBb/JfBFuaznxqR7QBKXyN0gYGyixi5jkR2215uDZhFOyr4ndgNy8rmKK1erHYvKnFiLCI+7q3vf/m6ElkJyIpw0rB7voGhBbHICSUGGTneHsvhLDiiSGOXm+v/7R92ATEyoYUgMgOlH9iTHv1eFhOQfvG9NNSzCFsINrTJnKn9piwE6HRT0jlCi8vEBDd563fliBmOifSl+kgptUb8KUYIzibcE82Xx3sbG4ffVB2XDk0PuFMTK6IyImmBUGH00L35oQ74z98kL1r4Y0MIzbImzn6TUAf+IspFtddAMXqfKzVKM1YabYFnJfVkZ/oYHmz/nJbsDOprhheNDLKBhEJA3zYFAZhBAkA+VoNzALLajMVn3ie2teCCczfgnMKgZh6Duxk9YPhRcpsL4ceU0g2OQTkRQfZ90b/vlZantHOAZESU2pRGvebmJe45B8ycfNwe2vn+CjgY58vbCzASgnZzk0J2czQpPJ5IlgMgeQfAgYGg/D8mddRfwd7QI21UjghSvwDW8AQ2RqyD5V/83LQh2b2ZXSwoTD5gBn2tSPzrk9UilRgLSnx/iWM3vDIWRGSSSIstzPXxRPf8w98sFGPCiVYFclcRQGLFkyhxmlCoeNPm3nY1cSril1XUctlodn6DtGV+njWOoRq7hKgP9ispZ1s9FR76ZwAjB785vjdGEwRAnTw96MXkeYhmK7UjpBoHi3CTblkWfKGI8cJInlqjO1CkmOQwUL+iygy9SGq2H6TDHDsbBRZLrQ5OSVCwZVUdVJYzTHIYpX1Fp9vauE1dicYSHObDEeTjuF/6EBKlcWyPli8sqs2KMgJ8/iEFivirB+CQ/l0A85qP9lob6MfrqEaZ9S8B/i31Qrpx9H25vHOwf6T7CEFgrPsz1Y7ttgpf6Yqb+Xm59b20ebhzmtEABAPBTEG7emr7XWIV8KB7+xsUTqAajbp0y20bX9N7dh4HfBa5wdvtjq9BO09cHbxJ3mLfEQJhGA7HLyy4Lr1Hpj/uui0xHvw+K/WXsS9eo+K3jAATNxcAkNCDZLmSToo1nQmLM9vuiGNrGk2AlHrgXXy9AxiI/S7ovTlGCxGLtJlA7+A1b+iE4oPOFLmBD9Rlry8dbha82pTOj0L2aDd2fhtpsEpAOACcO2eOBz0aIPYobKuqefVAaPZ4UVcXIKU/NkCrSWAUDNqAOILqkstvaF18k/uip34LR2RC2KhrjRbb/h6atPhnHJXNZ1tbcRDeHL/b3xsF1FoG35kDd0cZlVHah8HgvL+o0JHy3q/uCY8UrngEids/DldRJUudAKWe4PcEtzJeJEjMcY88uwQ26tgg71UaDVc+druivz086yahlqU7Ywz3xGt9tKuI+L6Ej297r6lr6HDvSG2h6K2odhdlfRb9R1HAqYTJ1Cc4+87wTHc0SlP4TKVuKv6f/7n/+JU8eLL/1bYFI/ucmsJlLx7z85AVnMnl1EzNOQFBLahtNdH/XFbNXNbBmh11+Np4OSyzlxuhBopHJLo+BQZTqFmNc/1GluNDsZR3/0lXZCpqVmzCJnyRpGbtKPZ1SY+hErmMi2//RoTQOZ5CitnnbrNnOu0L8QIlzg2CH8wCGJa8fbU0Gf426ubgbIZdN1tSKSa+O7zexSR2YYmjK4TGeR0Jyivt6FeBA3/YZ1wQahO6+lq+rS6wwqQVXnESMXbgEbjZqGU8lKotNraRC3xtJLWJoweGjxiYEI6jXZrtQR12k1vPHIxtdKmJqPQVUIqPzQNcThFs+MKYsF5JNvwkdvpBd6YZ1hBCM2HP3SOpHmesDYOAiujXxBPJYSwxXnNLYIIDW9eNQsPdLECovepJPnuAJYgH+1eQpzxcVK+5vRgWXB86Q+hhw+LITXu/rdnJcXJRGrqX8Q3sDiEfJ3bPJ1hE63zbfZ066uJ1ldl6yuLts6nAVIh0uvbnI6lZRskMBtu4llGabdZ+U/OMc4/7DR/xVClKXnzID/GwjgjsZ1ykxuxbcPDM7oQ9EcaPHQHxC8/KBLkieWIWmihjUnUWHDorOhtHjxpvAgGUDlA0uNYkx2jcRjjYV5bYJgf6GH2ZMjR5pa/arCtE+e/03iTid10SWonwhTM/jhtD9bTRFiqU7MlobByJIg/C+J52mPRZvPobKiJsJZLTYT9LOH14dPDp6zwtj5rvqJLUbRgdLtL3wTB/dwGGOCD7j5CJrnBCmvCILAwnm7tnR7sAuUy42k14isJ8TdldhgoexSbHIDlIqbf8lxc9rc6qrhc15DhwRlCmEYZC0gty27srb873d3Zp6wYa0856eyOeEBBJOudFJ/cOR+3zBbY4jOMkTRztwGbCxWrK6uJgENa+5yz3TwrW9Ybs/rGr3anRfpGE8k7beJ3gwSTAZqwfNsr6VUGxuCUs+/GOp0i3c6y56JD4swfJZkW4J8fPUr4KW9/N9EmGqovy/OpsarKpdHSeRHE5XP+0gHz7t1IblG+1mL6Ni+ndGWjY26TzIuXCkjHfHmgNFJ0rElATK8Eoc9mOVMf3Mt5IYIN9x67xrDWVOF1VdObebib6SoPbBVjkzEHqc+cb32T7qbQynu4IniV5JSZFDJHkdlJzaNO9CKkeNYprDi6sOvBZ4XhNKuE1GYCwiOXH+ZoXjg8lKDFwQVT2UR6eUDlWnQlREMUO9cwd5O1oolsjoNQwS8JVdzaJ0J9UvrDQ0Kmiw6LOe8u4LchijaWBVaREiF6Ip06a41/vDqaE/RyJu6nIN4S2QMYh313VVO5wKLULzto8499gSQ16YVhAF8DWV1Z86+mJae/p2Y2Nk7E7rxFIKjkB0Z0kw9u0SRELpAb6Pe2+fAWbeJhgLv6la3yMCTamTOwMp00S9sv7RuoHBW1hbIYlP7BvoNychnT/4+MBSy18k2V1Io3RbDQnFgjWea/q0vqrLSgR48t7m4n8E5Hk55OQ/i1uMbOe94OQH1e8TXHYhdI1Hzgaz7Ammu+5pnbcBL1Hvp6D02LRivRvQEpoBlleRR2+t6aZUm4j9l1ZfC4TIhUc1kjIr6mEYj90/esBV5tn5KLLXU2TX4rlbkYC2yvzStxoKj3L0/8EhhNKZyBQIkNvTP4zPn+jVqaTts7mOTXuCBtghyfSw0+LmfAHggoui4Hlu/0JwDyv3BSfLBKfKfdSejXPANK+OetqSHbP/UFEBYtFi9lEcbMbGBeqibq1T6iFKpRMz1EYMYPrP0QfpBhdsa1sAKiksoA1aUk6VzP0eH7CYFe7qu4GmvIf1UM1VMuxZSSgIScEzq25IoVUESWi7fUV4cN56DWVlH3JyUly9HaDfVi4Ev91VZdS6kU0evklo50Jbqgx47Ep8nndWT1iBjmGV2DsocoTqbKkfmCXyBLbR4eGhchU+3tq71ZXWIW4M5vRT6sZvXpoBoO1ZsLFMWK19Qd6Bi2kmqS1zejwaS6KgDasMg2ROqpbgF0DX3uu8LP/Niwy4TjXxIIm+V+O6rCDBn8cg9y5AWX8Oz2wDLvBijatDbG7i4g/G8xQqXnzeEOvq8KWwvYhT3b7uoGn/q9DrPCvy3OaDC6+obkm8Nd76q3csKAill+ii5+vr2MHO2LyY4+dMxMdzSFv8w89557u/cg3Tjo9fTsUzU5w8VJ37iWOag/N12vRltUyKd5kXeBXEKH0KDyoFjNEfV76UCDhv+RDYBNJiASpjCQfw2qQaaJplgCnY0Lqyk7EPeg+4+sqM4xUSaim6MsMs004MZvrmLYeC6aDqlDguilcspkCpkZyEHxERz+rsCeBWcTOPIYEDBdTPB1s+TZFB/kG+xW1RjVL8x27nG5Cr73OCJPPBnLzA6iUqe+nxN/QRMMZgOynxLfzyZoFNS3RpomYzV6dzmJTD+fLyeHRQ3LwiZ6lXNvYItCxolauCboj3k8bOAbLrM35Wj6eH0yyW+6QcNc1XXnlMIBP+OrjwhGHykkJqgmE4GekegMFAErTvkPsfudArvyoXnLiEt79jlS75NlUHzh1gRfmIdLzUNG+dV4WBxifiJ1XPO1+AW0+8+iCuoALRtohA2Oo2Eb4nJDhPNZ2OX4nMDGQpPbKaEcJeYZjvBeMc2jG7u4CngfA+URiTOKiNRPlcLvgVjz97/RNO7ylK+oM4AfHop1AuP1JoQ75KCpTmpFQmniB3YPDl4HLgbkkSHfh1UYgelR4DEjOI67ihBIwZfOeuewjyIFdNCVle/ejV+ct43T2IGVj1KqWqQQ6IjPYtxHgo+O1w+Pn3VPVu798OHu0n0lhQMEmD1WfWkI+49njr+/oOp7U5kgfBGid7f3Xx6/+mdR7Sb1Lci2DfNgm8lAvCXfVFTEPdAppMyQxXE4gJ4Cah75D4vMIWamC9a5zTSS1pqWrqXsPo3jHoYdJcxf88YgQhFZh2jX+r8TSTwz";
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