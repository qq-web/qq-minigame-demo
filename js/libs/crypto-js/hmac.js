(function(root, factory) {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = exports = factory(require("./core"));
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(["./core"], factory);
  } else {
    // Global (browser)
    factory(root.CryptoJS);
  }
})(this, function(CryptoJS) {
  (function() {
    // Shortcuts
    const C = CryptoJS;
    const C_lib = C.lib;
    const { Base } = C_lib;
    const C_enc = C.enc;
    const { Utf8 } = C_enc;
    const C_algo = C.algo;

    /**
     * HMAC algorithm.
     */
    const HMAC = (C_algo.HMAC = Base.extend({
      /**
       * Initializes a newly created HMAC.
       *
       * @param {Hasher} hasher The hash algorithm to use.
       * @param {WordArray|string} key The secret key.
       *
       * @example
       *
       *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
       */
      init(hasher, key) {
        // Init hasher
        hasher = this._hasher = new hasher.init();

        // Convert string to WordArray, else assume WordArray already
        if (typeof key === "string") {
          key = Utf8.parse(key);
        }

        // Shortcuts
        const hasherBlockSize = hasher.blockSize;
        const hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
          key = hasher.finalize(key);
        }

        // Clamp excess bits
        key.clamp();

        // Clone key for inner and outer pads
        const oKey = (this._oKey = key.clone());
        const iKey = (this._iKey = key.clone());

        // Shortcuts
        const oKeyWords = oKey.words;
        const iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (let i = 0; i < hasherBlockSize; i++) {
          oKeyWords[i] ^= 0x5c5c5c5c;
          iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
      },

      /**
       * Resets this HMAC to its initial state.
       *
       * @example
       *
       *     hmacHasher.reset();
       */
      reset() {
        // Shortcut
        const hasher = this._hasher;

        // Reset
        hasher.reset();
        hasher.update(this._iKey);
      },

      /**
       * Updates this HMAC with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {HMAC} This HMAC instance.
       *
       * @example
       *
       *     hmacHasher.update('message');
       *     hmacHasher.update(wordArray);
       */
      update(messageUpdate) {
        this._hasher.update(messageUpdate);

        // Chainable
        return this;
      },

      /**
       * Finalizes the HMAC computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The HMAC.
       *
       * @example
       *
       *     var hmac = hmacHasher.finalize();
       *     var hmac = hmacHasher.finalize('message');
       *     var hmac = hmacHasher.finalize(wordArray);
       */
      finalize(messageUpdate) {
        // Shortcut
        const hasher = this._hasher;

        // Compute HMAC
        const innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        const hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

        return hmac;
      }
    }));
  })();
});
