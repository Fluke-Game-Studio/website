// app/shared/navigation-bar/navbarService.js
angular.module('myAppNavbarService', [])
.factory('navbarFactory', [function () {
  var STORAGE_KEY = 'fg_google_user_v1';

  function safeParse(json) {
    try { return JSON.parse(json); } catch (e) { return null; }
  }

  function getStoredUser() {
    var raw = window.localStorage.getItem(STORAGE_KEY);
    var u = safeParse(raw);
    if (!u || !u.email) return null;
    return u;
  }

  function setStoredUser(user) {
    if (!user || !user.email) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      name: user.name || '',
      email: user.email || '',
      imageUrl: user.imageUrl || ''
    }));
  }

  function clearStoredUser() {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    // existing
    getNavbarHeadings: function () {
      return [
        { title: 'About' },
        { title: 'Services' },
        { title: 'Contact' },
        { title: 'Help' }
      ];
    },

    // ✅ new: auth storage
    getGoogleUser: function () { return getStoredUser(); },
    setGoogleUser: function (u) { setStoredUser(u); },
    clearGoogleUser: function () { clearStoredUser(); },
    isSignedIn: function () { return !!getStoredUser(); }
  };
}]);
