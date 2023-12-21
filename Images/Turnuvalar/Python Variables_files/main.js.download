var TopNavBar = {
  version: '1.0.23',
  defaultHeight: '88px',
  fullHeight: '100vh',
  element: document.getElementById('top-nav-bar'),
  // searchFromBox: false,
  // fullScreenNav: false,
  // fullScreenSearchResults: false,
  parentLayoutNotifier: null,
  inIframe: null,
  location: null,
  env: null,
  loggedIn: null,
  configured: false,
  _debug: null,
};

window.TopNavBar = TopNavBar;

TopNavBar._menuSectionsInTab = {
  'tutorials': [
    'tutorials_html_css_links_list',
    'tutorials_data_analytics_links_list_desktop',
    'tutorials_web_building_links_list_desktop',
    'tutorials_javascript_links_list',
    'tutorials_backend_links_list'
  ],
  'exercises': [
    'exercises_html_css_links_list',
    'exercises_data_analytics_links_list_desktop',
    'exercises_javascript_links_list',
    'exercises_backend_links_list'
  ],
  'certified': [
    'certified_html_css_links_list',
    'certified_data_analytics_links_list_desktop',
    'certified_programs_links_list_desktop',
    'certified_javascript_links_list',
    'certified_backend_links_list'
  ]
};

TopNavBar._findInnerElements = function (parentElement, queryStr, callback) {
  var output = [];

  var hasCallback = typeof callback !== 'undefined';

  var elements = parentElement.querySelectorAll(queryStr);

  for (var index = 0; index < elements.length; index++) {
    output.push(elements[index]);

    if (hasCallback) {
      callback(elements[index], index);
    }
  }

  return output;
};

TopNavBar._loopArray = function (arr, callback) {
  for (var index = 0; index < arr.length; index++) {
    callback(arr[index], index);
  }
};

TopNavBar._loopObj = function (obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj[key], key);
    }
  }
};

TopNavBar._inIframe = function () {
  if (TopNavBar.inIframe !== null) {
    return TopNavBar.inIframe;
  }

  try {
    TopNavBar.inIframe = window.self !== window.top;
  } catch (e) {
    TopNavBar.inIframe = true;
  }

  return TopNavBar.inIframe;
}

TopNavBar._isDebugMode = function () {
  if (TopNavBar._debug !== null) {
    return TopNavBar._debug;
  }

  if (
    localStorage.getItem('TopNavBar.debug') === 'true'
  ) {
    TopNavBar._debug = true;
  } else {
    TopNavBar._debug = false;
  }

  return TopNavBar._debug;
};

TopNavBar._logDebug = (message, data) => {
  if (!TopNavBar._isDebugMode()) {
    return;
  }

  if (typeof data === 'undefined') {
    console.log('TopNavBar -> ' + message);
  } else {
    console.log('TopNavBar -> ' + message, data);
  }
}

TopNavBar.isExpanded = function () {
  var navs = [
    '#nav_tutorials',
    '#nav_exercises',
    '#nav_certified',
    '#nav_services',
    '.tnb-mobile-accordion-nav',
  ];

  for (var i = 0; i < navs.length; i++) {
    var element = TopNavBar.element.querySelector(navs[i]);

    if (
      element
      && element.style.display !== 'none'
      && element.style.display !== ''
    ) {
      return true;
    };
  }

  return TopNavBar.googleSearchResultsShown();
};

TopNavBar._sendParentInitMessage = function () {
  window.parent.postMessage({
    'action': 'INIT',
    'initHeight': TopNavBar.defaultHeight,
  }, '*');
};

TopNavBar._highlightNetworkSubNavActiveLinks = function () {
  if (TopNavBar.env !== 'network') {
    return;
  }

  var subdomain = TopNavBar.location.hostname.split('.')[0];

  var pathname = TopNavBar.location.pathname;

  var linkId = null;

  if (subdomain.startsWith('campus')) {
    TopNavBar.element.querySelector("#campus-secondary-top-nav-bar").style.display = "flex";
    TopNavBar.element.querySelector("#secondary-top-nav-bar").style.display = "none";

    var campusPages = {
      '/': 'campus-home-link',
      '/collections/course-catalog': 'campus-certificate-courses-link',
      '/collections/certifications': 'campus-certificate-exams-link',
      '/collections/bootcamps': 'campus-bootcamps-link',
      '/products/w3schools-full-access-course': 'campus-full-access-link',
      '/collections/aws-courses': 'campus-aws-courses-link',
    };

    linkId = campusPages[pathname]; // could be undefined
  } else if (subdomain.startsWith('spaces')) {
    linkId = pathname.startsWith('/domains') ? 'domains-link' : 'spaces-link';
  } else if (subdomain === 'my-learning' || subdomain.startsWith('myl')) {
    if (pathname.startsWith('/certificates')) {
      linkId = 'certificates-link';
    } else if (pathname.startsWith('/videos')) {
      linkId = 'videos-link';
    } else {
      linkId = 'my-learning-link';
    }
  } else if (subdomain.startsWith('profile')) {
    var profilePaths = {
      '/profile': true,
      '/settings': true,
      '/editprofile': true,
      '/edit-profile': true
    };

    if (typeof profilePaths[pathname] !== 'undefined') {
      linkId = 'profile-link';
    }
  } else if (subdomain.startsWith('billing')) {
    linkId = 'billing-link';
  }

  if (linkId) {
    var linkElm = TopNavBar.element.querySelector('#' + linkId);

    if (linkElm) {
      linkElm.classList.add('active');
    };
  }
}

TopNavBar._hideNetworkVideosLinkShiningStars = function () {
  if (TopNavBar.env !== 'network') {
    return;
  }

  TopNavBar.element.querySelector('#videos-link > .shining-stars').classList.add('w3-hide');
}

TopNavBar._showNetworkVideosLinkShiningStars = function () {
  if (TopNavBar.env !== 'network') {
    return;
  }

  TopNavBar.element.querySelector('#videos-link > .shining-stars').classList.remove('w3-hide');
}

TopNavBar._applyNoUpsellUiTweaks = function () {
  TopNavBar.element.querySelector('#campus-link').style.display = 'none';
  TopNavBar.element.querySelector('#billing-link').style.display = 'none';
  TopNavBar.element.querySelector('#navbtn_certified').style.display = 'none';
  TopNavBar.element.querySelector('.tnb-mobile-accordion-nav .tnb-menu-cert-and-course-btn').style.display = 'none';

  TopNavBar._findInnerElements(TopNavBar.element, '.serviceboxes', function (serviceBoxElm) {
    TopNavBar._findInnerElements(serviceBoxElm, '.services', function (serviceElm, serviceElmIndex) {
      if (serviceElmIndex % 3 === 2) {
        serviceElm.style.display = 'none';
      }
    });
  });

  TopNavBar._hideNetworkVideosLinkShiningStars();

  TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
    elm.classList.add('w3-hide');
  });
}

TopNavBar.postInitConfig = function (prs) {
  TopNavBar._logDebug('postInitConfig');
  // return;

  // can be checked to avoid configuring twice
  TopNavBar.configured = true;

  if (
    typeof prs.sendParentInitMessage !== 'undefined'
    && prs.sendParentInitMessage === true
  ) { // optional prop required in billing setup
    TopNavBar._sendParentInitMessage();
  }

  TopNavBar.env = prs.env;

  TopNavBar.location = prs.location; // location required fields: href, hostname, pathname

  // execution order priority: high
  TopNavBar._applyUserSessionUiTweaks({
    loggedIn: prs.loggedIn,
    subscriptionPlan: prs.subscriptionPlan
  });

  // execution order priority: low
  TopNavBar._highlightNetworkSubNavActiveLinks();

  var featureFlags = prs.featureFlags;

  if (typeof featureFlags === 'undefined') {
    featureFlags = {
      'noUpsell': false,
    };
  }

  // execution order priority: low
  if (featureFlags.noUpsell) {
    TopNavBar._applyNoUpsellUiTweaks();
  }
}

TopNavBar._applyUserSessionUiTweaks = function (prs) {
  TopNavBar._logDebug('_applyUserSessionUiTweaks -> prs: ', prs);

  var loggedIn = prs.loggedIn;
  var subscriptionPlan = prs.subscriptionPlan;
  var initialLoggedInState = TopNavBar.loggedIn;
  var loggedInStateChanged = TopNavBar.loggedIn !== loggedIn;
  TopNavBar.loggedIn = loggedIn;

  TopNavBar._logDebug('_applyUserSessionUiTweaks -> state: ', {
    'loggedIn': loggedIn,
    'initialLoggedInState': initialLoggedInState,
    'loggedInStateChanged': loggedInStateChanged,
    'subscriptionPlan': subscriptionPlan
  });

  if (loggedIn) {
    TopNavBar._findInnerElements(document, '.user-authenticated', function (elm) {
      elm.classList.remove('w3-hide');
    });

    TopNavBar._findInnerElements(document, '.user-anonymous', function (elm) {
      elm.classList.add('w3-hide');
    });

    if (subscriptionPlan === 'free') {
      TopNavBar._showNetworkVideosLinkShiningStars();
    } else if (subscriptionPlan === 'diamond') {
      TopNavBar._hideNetworkVideosLinkShiningStars();

      TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
        elm.classList.add('w3-hide');
      });
    }

    if (subscriptionPlan === 'free' || subscriptionPlan === 'pro') {
      TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
        elm.classList.remove('w3-hide');
      });
    }
  } else { // anonymous
    TopNavBar._findInnerElements(document, '.user-authenticated', function (elm) {
      elm.classList.add('w3-hide');
    });

    TopNavBar._findInnerElements(document, '.user-anonymous', function (elm) {
      elm.classList.remove('w3-hide');
    });

    TopNavBar._hideNetworkVideosLinkShiningStars();

    TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
      elm.classList.add('w3-hide');
    });
  }
};

TopNavBar.init = function () {
  TopNavBar._logDebug('init');

  TopNavBar.location = window.location;

  // execution order priority: high
  TopNavBar.initUserPreferredTheme();

  // blind lookup
  var subscriptionPlan = UserSession.getUserSubscriptionPlan(null);

  var loggedIn = subscriptionPlan !== null;

  TopNavBar.loggedIn = loggedIn;

  if (subscriptionPlan === null) {
    subscriptionPlan = 'free';
  }

  // execution order priority: high
  TopNavBar._applyUserSessionUiTweaks({
    loggedIn: loggedIn,
    subscriptionPlan: subscriptionPlan
  });

  // execution order priority: high
  if (TopNavBar._inIframe()) {
    TopNavBar._iframeInit();
  }

  // execution order priority: low
  TopNavBar._attachMenuSortLogic();

  // execution order priority: low
  TopNavBar._attachNavEscapeListeners();

  // execution order priority: low
  TopNavBar.element.querySelector('#tnb-next-bootcamp-date').textContent = TopNavBar.getNextBootcampDate();
};

TopNavBar._iframeInit = function () {
  window.addEventListener('message', function (event) {
    if (event.data.type === 'CONFIG') {
      TopNavBar.postInitConfig(event.data.value);
    }
  });

  TopNavBar._sendParentInitMessage();

  TopNavBar.element.addEventListener('click', function (event) {
    TopNavBar.notifyParentAboutLayout('on click', event);
  });

  TopNavBar.element.addEventListener('keyup', function (event) {
    TopNavBar.notifyParentAboutLayout('on keyup', event);
  });

  TopNavBar.element.addEventListener('resize', function (event) {
    TopNavBar.notifyParentAboutLayout('on resize', event);
  });
}

TopNavBar.notifyParentAboutLayout = function (context, event) {
  if (!TopNavBar._inIframe()) {
    return;
  }

  TopNavBar._logDebug('notifyParentAboutLayout -> context, event: ', {
    'context': context,
    'event': event
  });

  clearTimeout(TopNavBar.parentLayoutNotifier);

  TopNavBar.parentLayoutNotifier = setTimeout(function () {
    var expanded = TopNavBar.isExpanded();

    window.parent.postMessage({
      'context': context,
      'action': 'LAYOUT',
      'expanded': expanded,
      'iframeHeight': expanded ? TopNavBar.fullHeight : TopNavBar.defaultHeight,
      'placeholderHeight': TopNavBar.defaultHeight
    }, '*');
  }, 100);
};

TopNavBar._attachNavEscapeListeners = function () {
  var navIds = [
    'tutorials',
    'exercises',
    'certified',
    'services'
  ];

  TopNavBar._loopArray(navIds, function (navId) {
    document.getElementById('nav_' + navId).addEventListener('keydown', function (event) {
      if (event.code === 'Escape') {
        TopNavBar.closeNavItem(navId);
      }
    });
  });
};

// < Google Search

TopNavBar.googleSearchInit = function () {
  TopNavBar._logDebug('googleSearchInit');

  var gSearchScriptElm = document.getElementById('gSearch');

  if (gSearchScriptElm == null) {
    var cx = uic_r_y();
    var gSearchScriptElmToInject = document.createElement('script');
    gSearchScriptElmToInject.id = 'gSearch';
    gSearchScriptElmToInject.type = 'text/javascript';
    gSearchScriptElmToInject.async = true;
    gSearchScriptElmToInject.src = 'https://www.google.com/cse/cse.js?cx=' + cx;

    var firstScriptElm = document.getElementsByTagName('script')[0];
    firstScriptElm.parentNode.insertBefore(gSearchScriptElmToInject, firstScriptElm);
  }

  TopNavBar.googleSearchFocusInput();
};

TopNavBar.googleSearchFocusInput = function () {
  TopNavBar._logDebug('googleSearchFocusInput');

  document.getElementById('tnb-google-search-input').focus();
};

TopNavBar.googleSearchResultsShown = function () {
  var googleSearchResults = TopNavBar.element.querySelector('.gsc-results-wrapper-overlay.gsc-results-wrapper-visible');

  return !!googleSearchResults;
};

TopNavBar.googleSearchResultsShownCallback = function (callback) {
  if (TopNavBar.googleSearchResultsShown()) {
    return callback();
  }

  var lookupAttempts = 512; // ~ 1 minute

  var lookupInterval = setInterval(function () {
    if (TopNavBar.googleSearchResultsShown()) {
      clearInterval(lookupInterval);

      return callback();
    }

    lookupAttempts--;

    if (!lookupAttempts) {
      console.error('TopNavBar -> googleSearchResultsShownCallback -> timeout');

      return clearInterval(lookupInterval);
    }
  }, 100);
};

TopNavBar._googleSearchPatchResultLinks = function () {
  TopNavBar._findInnerElements(document.getElementById('googleSearch'), '.gsc-results a', function (linkElm) {
    linkElm.setAttribute('target', '_blank');
  });
};

TopNavBar.googleSearchShowMobileContainer = function () {
  document.getElementById('tnb-google-search-container').classList.add('tnb-mobile-active');
};

TopNavBar.googleSearchHideMobileContainer = function () {
  document.getElementById('tnb-google-search-container').classList.remove('tnb-mobile-active');
};

TopNavBar.googleSearchAttachKeyPressHandler = function (event) {
  var x, n, nn, i, cc = 0;
  var keycode = event.keyCode;
  if (keycode === 38 || keycode === 40) { //up || down
    x = TopNavBar.element.getElementsByClassName("search_item");
    for (i = 0; i < x.length; i++) {
      if (x[i].className.indexOf("search_active") > -1) {
        x[i].className = "search_item";
        n = i;
        break;
      }
    }
    if (keycode === 38) {
      nn = n - 1;
      if (nn < 0) nn = 0;
    }
    if (keycode === 40) {
      nn = n + 1;
      if (nn >= x.length) nn = nn - 1;
    }
    x[nn].className = "search_item search_active";
  }
  if (keycode === 13) {  //enter
    event.preventDefault();
    x = TopNavBar.element.getElementsByClassName("search_item");
    if (x.length === 0) {
      cc = 1;
    }
    for (i = 0; i < x.length; i++) {
      if (x[i].className.indexOf("search_active") > -1) {
        n = x[i].href;
        if (n.indexOf("search_entire_w3schools") > -1) {
          cc = 1;
        }
        break;
      }
    }
    if (cc === 1) {
      TopNavBar.googleSearchSubmit();
    } else {
      window.location = n;
    }
  }
};

TopNavBar.googleSearchInitializedCallback = function (callback) {
  if (typeof google == 'object') {
    return callback();
  }

  var lookupAttempts = 512; // ~ 1 minute

  var lookupInterval = setInterval(function () {
    if (typeof google == 'object') {
      clearInterval(lookupInterval);

      return callback();
    }

    lookupAttempts--;

    if (!lookupAttempts) {
      console.error('TopNavBar -> googleSearchInitializedCallback -> timeour');

      return clearInterval(lookupInterval);
    }
  }, 100);
}

TopNavBar.googleSearchGetInputValue = function () {
  return document.getElementById('tnb-google-search-input').value;
}

TopNavBar.googleSearchSubmit = function () {
  TopNavBar._logDebug('googleSearchSubmit');

  TopNavBar.googleSearchInit();

  if (!TopNavBar.googleSearchGetInputValue()) {
    TopNavBar._logDebug('googleSearchSubmit -> empty input');

    return;
  }

  TopNavBar.googleSearchInitializedCallback(TopNavBar.googleSearchExecute);
};

TopNavBar.googleSearchExecute = function () {
  var googleSearchInputValue = TopNavBar.googleSearchGetInputValue();
  var googleSearchExecuteRes = google.search.cse.element.getElement('standard0').execute(googleSearchInputValue);

  TopNavBar._logDebug('googleSearchExecute -> googleSearchInputValue, googleSearchExecuteRes: ', {
    'googleSearchInputValue': googleSearchInputValue,
    'googleSearchExecuteRes': googleSearchExecuteRes,
  });

  TopNavBar.googleSearchResultsShownCallback(function () {
    TopNavBar._googleSearchPatchResultLinks();

    if (TopNavBar._inIframe()) {
      TopNavBar.notifyParentAboutLayout('on google search results', {
        'inputValue': googleSearchInputValue,
      });
    }
  });
};

// > Google Search

TopNavBar.openMenu = function () {
  var accordionNavElm = TopNavBar.element.querySelector('.tnb-mobile-accordion-nav');
  var accordionNavBtnElm = TopNavBar.element.querySelector('.tnb-menu-btn');

  if (accordionNavElm.style.display === 'none') {
    accordionNavElm.style.display = 'flex';
    accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'none';
    accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'inline';
  } else {
    accordionNavElm.style.display = 'none';
    accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'inline';
    accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'none';
    TopNavBar.closeAllNavItems();
    TopNavBar.closeMenu();
  }

  TopNavBar.notifyParentAboutLayout('on menu open (toggle)');
};

TopNavBar.closeMenu = function () {
  TopNavBar.element.querySelector('.tnb-mobile-accordion-nav').style.display = 'none';

  var accordionNavBtnElm = TopNavBar.element.querySelector('.tnb-menu-btn');
  accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'inline';
  accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'none';

  TopNavBar.notifyParentAboutLayout('on menu close');
};

TopNavBar.closeXsMenu = function (x) {
  TopNavBar.element.querySelector('#sectionxs_' + x).innerHTML = '';
  TopNavBar.element.querySelector('#sectionxs_' + x + '_icon').classList.remove('fa-caret-up');
  TopNavBar.element.querySelector('#sectionxs_' + x + '_icon').classList.add('fa-caret-down');
};

TopNavBar.openXsMenu = function (x) {
  var xs_menus = ['tutorials', 'exercises', 'certified', 'services'];
  var mobileSection = TopNavBar.element.querySelector('#sectionxs_' + x);
  var xs_menu;

  if (mobileSection.innerHTML === '') {
    TopNavBar.element.querySelector('#sectionxs_' + x).innerHTML = TopNavBar.element.querySelector('#nav_' + x).innerHTML;
    TopNavBar.element.querySelector('#sectionxs_' + x + '_icon').classList.remove('fa-caret-down');
    TopNavBar.element.querySelector('#sectionxs_' + x + '_icon').classList.add('fa-caret-up');

    for (var i = 0; i < xs_menus.length; i++) {
      xs_menu = xs_menus[i];

      if (xs_menu !== x) {
        TopNavBar.closeXsMenu(xs_menu);
      }
    }

    TopNavBar.element.querySelector('.tnb-mobile-accordion-nav').scroll(0, 0);
  } else {
    for (var i = 0; i < xs_menus.length; i++) {
      xs_menu = xs_menus[i];

      TopNavBar.closeXsMenu(xs_menu);
    }

    TopNavBar.element.querySelector('.tnb-mobile-accordion-nav').scroll(0, 0);
  }
};

TopNavBar.openNavItem = function (navId) {
  if (TopNavBar.element.querySelector('#nav_' + navId).style.display === 'block') {
    TopNavBar.closeNavItem(navId);

    TopNavBar.element.classList.remove('full-screen');
  } else {
    TopNavBar.closeAllNavItems();

    TopNavBar.element.classList.add('full-screen');

    TopNavBar.element.querySelector('#nav_' + navId).style.display = 'block';
    TopNavBar.element.querySelector(`#nav_${navId}`).focus();

    if (TopNavBar.element.querySelector('#navbtn_' + navId)) {
      TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[0].style.display = 'none';
      TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[1].style.display = 'inline';
      TopNavBar.element.querySelector('#navbtn_' + navId).classList.add('mystyle');
    }

    TopNavBar.notifyParentAboutLayout('on nav item open', {
      'navId': navId,
    });
  }
};

TopNavBar.closeNavItem = function (navId) {
  var navItemElm = TopNavBar.element.querySelector('#nav_' + navId)

  if (!navItemElm) {
    return;
  }

  navItemElm.style.display = 'none';

  TopNavBar.element.classList.remove('full-screen');

  if (navId !== 'services') {
    try {
      var inputAltEvent = new Event('input', {
        'bubbles': true,
        'cancelable': true
      });

      navItemElm.querySelector('input').value = ''
      navItemElm.querySelector('input').dispatchEvent(inputAltEvent)
    } catch (exc) {
      console.error(exc);
    }
  }

  if (TopNavBar.element.querySelector('#navbtn_' + navId)) {
    TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[0].style.display = 'inline';
    TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[1].style.display = 'none';
    TopNavBar.element.querySelector('#navbtn_' + navId).classList.remove('mystyle');
  }

  TopNavBar.notifyParentAboutLayout('on nav item close', {
    'navId': navId,
  });
};

// < menu filter
TopNavBar.allMenuItemsInCategoryAreHidden = function (menu, category) {
  var elements = menu.querySelectorAll(`[data-category="${category}"]`);

  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].classList.contains('d-none')) {
      return false;
    }
  }

  return true;
};

TopNavBar.filter = function (event, sectionId) {
  var filterValue = event.target.value.toLowerCase();

  var sectionElm = TopNavBar.element.querySelector('#' + sectionId);

  var noMatchElm = sectionElm.querySelector('#no-match');

  if (noMatchElm) {
    noMatchElm.remove();
  }

  var navNextBootcampElm = sectionElm.querySelector('#tnb-next-bootcamp');

  if (
    (
      sectionId === 'nav_tutorials'
      || sectionId === 'sectionxs_tutorials'
    )
    && navNextBootcampElm.style.display === 'none'
  ) {
    navNextBootcampElm.style.display = 'block';
  } else {
    TopNavBar._findInnerElements(sectionElm, '.black-box-container', function (elm) {
      elm.style.display = 'block';
    });
  }

  var uniqueCategoriesDeduplicator = {};

  TopNavBar._findInnerElements(sectionElm, '[data-category]', function (elm) {
    uniqueCategoriesDeduplicator[elm.getAttribute('data-category')] = true;
  });

  var uniqueCategories = Object.keys(uniqueCategoriesDeduplicator);

  TopNavBar._findInnerElements(sectionElm, '[data-name]', function (elm) {
    var dataName = elm.getAttribute('data-name');

    if (!dataName.includes(filterValue)) {
      elm.classList.remove('d-block');
      elm.classList.add('d-none');
    } else {
      elm.classList.remove('d-none');
      elm.classList.add('d-block');
    }
  });

  var emptyCategories = [];

  uniqueCategories.forEach(function (category) {
    var allHidden = TopNavBar.allMenuItemsInCategoryAreHidden(sectionElm, category);

    if (allHidden) {
      emptyCategories.push(category);
    }

    // hide section heading element if all inner items are hidden
    TopNavBar._findInnerElements(sectionElm, `[data-heading="${category}_title"]`, function (headingElm) {
      if (allHidden) {
        headingElm.classList.add('d-none');
      } else {
        headingElm.classList.remove('d-none');
      }
    });
  });

  // Checks if all categories are empty, if true displays a message "No match found..."
  if (emptyCategories.length === uniqueCategories.length) {
    var noMatchMessage = document.createElement('div');
    noMatchMessage.id = 'no-match';
    noMatchMessage.textContent = 'No matches found';
    noMatchMessage.style.marginTop = '25px';
    noMatchMessage.style.textAlign = 'center';
    sectionElm.querySelector('.w3-content').appendChild(noMatchMessage);

    if (sectionId === 'nav_tutorials' || sectionId === 'sectionxs_tutorials') {
      sectionElm.querySelector('#tnb-next-bootcamp').style.display = 'none';
    } else {
      TopNavBar._findInnerElements(sectionElm, '.black-box-container', function (elm) {
        elm.style.display = 'none';
      });
    }
  }
};

// > menu filter
TopNavBar.bootcampDates = {
  "2023-09-18": "September 18th",
  "2023-10-24": "October 24th",
  "2023-12-04": "December 4th",
  "2024-01-16": "January 16th",
  "2024-02-26": "February 26th"
};

TopNavBar.getNextBootcampDate = function () {
  var currentDate = new Date();

  // Filter the dates that are upcoming
  var upcomingDates = Object.keys(TopNavBar.bootcampDates).filter(function (dateStr) { return new Date(dateStr) > currentDate; });

  // Sort the upcoming dates in ascending order
  upcomingDates.sort(function (a, b) { return new Date(a) - new Date(b) });

  // If there are upcoming dates, format the closest upcoming date
  if (upcomingDates.length > 0) {
    var closestDate = upcomingDates[0];
    return TopNavBar.bootcampDates[closestDate];
  } else {
    // If no dates are found, return "Soon"
    return "Soon";
  }
};

TopNavBar.sortMenu = function (sectionId, type) {
  var section = TopNavBar.element.querySelector('#nav_' + sectionId);

  var linkLists = TopNavBar._menuSectionsInTab[sectionId].map(function (listId) {
    return section.querySelector(`#${listId}`);
  });

  if (type.toLowerCase() === 'alphabetically') {
    linkLists.forEach(function (list) {
      var divsArray = TopNavBar._findInnerElements(list, 'div');

      // Sort the child divs.
      divsArray.sort(function (a, b) {
        var aText = a.querySelector('a').innerText;
        var bText = b.querySelector('a').innerText;
        return aText.toLowerCase().localeCompare(bText.toLowerCase());
      });

      // Append each sorted div back into the parent.
      divsArray.forEach(function (div) {
        list.appendChild(div);
      });
    });
  } else {
    linkLists.forEach(function (section) {
      var divsArray = TopNavBar._findInnerElements(section, 'div');
      // Sort based on original index.
      divsArray.sort(function (a, b) {
        return a.dataset.originalIndex - b.dataset.originalIndex;
      });
      // Append each sorted div back into the parent.
      divsArray.forEach(function (div) {
        section.appendChild(div);
      });
    });
  }
};

TopNavBar.closeAllNavItems = function () {
  TopNavBar.closeNavItem("tutorials");
  TopNavBar.closeNavItem("exercises");
  TopNavBar.closeNavItem("certified");
  TopNavBar.closeNavItem("services");

  TopNavBar.element.classList.remove('full-screen');
};

TopNavBar.initUserPreferredTheme = function () {
  TopNavBar.toggleUserPreferredTheme(true);
};

TopNavBar.toggleUserPreferredTheme = function (init) {
  if (typeof init === 'undefined') {
    init = false;
  }

  // var codeTheme = localStorage.getItem('preferredmode');
  var pageTheme = localStorage.getItem('preferredpagemode');

  if (!init) {
    if (pageTheme == 'dark') {
      pageTheme = 'light';
    } else {
      pageTheme = 'dark';
    }
  }

  var bodyClassName = document.body.className
    .replace('darktheme', '')
    .replace('darkpagetheme', '')
    .replace('  ', ' ');

  if (pageTheme == 'dark') {
    bodyClassName += ' darktheme';
    bodyClassName += ' darkpagetheme';
  }

  document.body.className = bodyClassName;
  localStorage.setItem('preferredmode', pageTheme);
  localStorage.setItem('preferredpagemode', pageTheme);
};

// generic one
TopNavBar.mouseHandler = function (event, elm, closingOrExtra) {
  TopNavBar._logDebug('mouseHandler -> args: ', arguments);

  if (typeof closingOrExtra === 'undefined') {
    closingOrExtra = false;
  }

  var icon = elm.querySelector('i');
  if (event.type === 'keydown') {
    if (event.code !== 'Enter') return;
    if (event.code === 'Enter') {
      if (elm.id.includes('close-nav-x')) {
        TopNavBar.closeNavItem(closingOrExtra); // closingOrExtra in this case is 'tutorials' | 'exercises' | 'certified' | 'services'
        return;
      }
      var modalonEnter = elm.nextElementSibling;
      icon.className = modalonEnter.style.display === 'block' ? 'fa fa-caret-down filter-caret' : 'fa fa-caret-up filter-caret';
      modalonEnter.style.display = modalonEnter.style.display === 'block' ? 'none' : 'block';
    } else {
      event.preventDefault();
    }
  } else if (elm.id.includes('close-nav-x')) {
    TopNavBar.closeNavItem(closingOrExtra); // closingOrExtra in this case is 'tutorials' | 'exercises' | 'certified' | 'services'
  } else {
    var modalonKeydown = elm.querySelector(".filter-modal-container");
    icon.className = closingOrExtra ? 'fa fa-caret-down filter-caret' : 'fa fa-caret-up filter-caret';
    modalonKeydown.style.display = closingOrExtra ? 'none' : 'block';
  }
};

TopNavBar._attachMenuSortLogic = function () {
  TopNavBar._logDebug('_attachMenuSortLogic');

  // used for restoring original sort order
  var storeOriginalSortIndexes = function () {
    var menus = [];

    TopNavBar._loopObj(TopNavBar._menuSectionsInTab, function (tabListIds, tabId) {
      menus.push(
        tabListIds.map(function (listId) {
          return TopNavBar.element.querySelector(`#nav_${tabId}`).querySelector(`#${listId}`);
        })
      );
    });

    menus.forEach(function (lists) {
      lists.forEach(function (list) {
        TopNavBar._findInnerElements(list, 'div', function (divElm, divElmIndex) {
          divElm.dataset.originalIndex = divElmIndex;
        });
      })
    });
  };

  storeOriginalSortIndexes();

  var attachSortBtnEventListeners = function (sortBtnElm) {
    sortBtnElm.addEventListener('mouseenter', function (event) {
      TopNavBar.mouseHandler(event, sortBtnElm, false);
    });

    sortBtnElm.addEventListener('mouseleave', function (event) {
      TopNavBar.mouseHandler(event, sortBtnElm, true);
    });

    sortBtnElm.addEventListener('focusout', function (event) {
      var isClickInside = sortBtnElm.contains(event.relatedTarget);

      if (!isClickInside) {
        sortBtnElm.querySelector('.filter-modal-container').style.display = 'none';
      }
    })
  };

  var enabledSortNavs = ['tutorials', 'exercises', 'certified'];

  TopNavBar._loopArray(enabledSortNavs, function (sortNav) {
    var sortBtnElm = TopNavBar.element.querySelector('#' + sortNav + '-sort-btn');

    if (sortBtnElm) {
      attachSortBtnEventListeners(sortBtnElm);

      var sortFilterContainer = sortBtnElm.querySelector(".filter-modal");
      TopNavBar._logDebug('sortNav, sortFilterContainer: ', {
        sortNav: sortNav,
        sortFilterContainer: sortFilterContainer
      });

      if (sortFilterContainer) {
        TopNavBar._findInnerElements(sortFilterContainer, 'button', function (buttonElm) {
          buttonElm.addEventListener('click', function (event) {
            TopNavBar._logDebug('sortNav click: ', {
              sortNav: sortNav,
              eventTarget: event.target
            });

            var sortBy = event.target.innerText;
            TopNavBar.element.querySelector(`#${sortNav}-active-sorting`).textContent = sortBy;

            var sortByBtn = sortFilterContainer.querySelector(`#${sortNav}-${sortBy.toLowerCase()}`);
            sortFilterContainer.querySelector('.w3-button.active').classList.remove('active');

            sortByBtn.classList.add('active');
            TopNavBar.sortMenu(sortNav, sortBy);
          });
        });
      }
    }
  });
};

// < legacy mapping
window.w3_open = TopNavBar.openMenu;
window.w3_close = TopNavBar.closeMenu;
window.w3_open_xs_menu = TopNavBar.openXsMenu;
window.w3_close_xs_menu = TopNavBar.closeXsMenu;
window.w3_open_nav = TopNavBar.openNavItem;
window.w3_close_nav = TopNavBar.closeNavItem;
window.w3_close_all_topnav = TopNavBar.closeAllNavItems;
window.open_search = TopNavBar.googleSearchFocusInput;
window.gSearch = TopNavBar.googleSearchInit;
// > legacy mapping

TopNavBar.init();
