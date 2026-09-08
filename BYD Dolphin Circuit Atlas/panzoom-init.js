(function () {
  function init() {
    try {
      var svg = document.querySelector('svg');
      if (!svg || typeof window.svgPanZoom !== 'function') return;

      // Avoid double-init
      if (window.__pzInstance && typeof window.__pzInstance.destroy === 'function') {
        try { window.__pzInstance.destroy(); } catch (e) {}
      }

      // Make the SVG behave like a viewport
      try {
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';
        svg.style.cursor = 'grab';
      } catch (e) {}

      // Ensure viewBox exists
      if (!svg.getAttribute('viewBox')) {
        var w = parseFloat(svg.getAttribute('width')) || svg.clientWidth || 1000;
        var h = parseFloat(svg.getAttribute('height')) || svg.clientHeight || 1000;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        svg.removeAttribute('width');
        svg.removeAttribute('height');
      }

      window.__pzInstance = window.svgPanZoom(svg, {
        zoomEnabled: true,
        panEnabled: true,
        mouseWheelZoomEnabled: true,
        dblClickZoomEnabled: false,
        controlIconsEnabled: false,
        fit: true,
        center: true,
        minZoom: 0.1,
        maxZoom: 30,
        zoomScaleSensitivity: 0.2,
        preventMouseEventsDefault: true
      });

      // Nice cursor behaviour
      svg.addEventListener('mousedown', function (e) {
        if (e.button === 0) svg.style.cursor = 'grabbing';
      });
      document.addEventListener('mouseup', function () {
        svg.style.cursor = 'grab';
      });

    } catch (e) {
      if (window.console) console.error(e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
