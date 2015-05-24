var Session = function(App){
    //won't be used for now
    return {
      get: function(key) {
        return JSON.parse(sessionStorage.getItem(key));
      },
      set: function(key, value) {
        try {
          sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
          if (e.code == DOMException.QUOTA_EXCEEDED_ERR && sessionStorage.length === 0) {
            App.vent.trigger('notify:error', {
              title: '',
              text: 'You are currently in private browsing mode. Please turn private browsing off in Safari in order to continue using the lounge.'
            });
            return false;
          } else {
            throw e;
          }
        }
      },
      unset: function(key) {
        sessionStorage.removeItem(key);
      }
    }
  }

  module.exports = new Session();