export default class Shuchusen {
  /**
   * @param {ShuchusenProps} props
   */
  constructor (props) {
    this.props = props;
    this._animationId = 0;
  }

  /**
   * @returns {Promise<void>}
   */
  emphasize () {
    return new Promise((resolve) => {
      if (this._animationId !== 0) {
        window.cancelAnimationFrame(this._animationId);
        this._animationId = 0;
      }

      this.props.el.hidden = false;

      const c = this._buildShuchusenContext(this.props);

      const startedAt = Date.now();
      const duration = 2000;
      const f = () => {
        const elapse = Date.now() - startedAt;
        if (elapse > duration) {
          window.cancelAnimationFrame(this._animationId);
          this._animationId = 0;
          this.props.el.hidden = true;
          resolve();
          return;
        }

        const { el } = this.props;
        el.style.opacity = String(1 - elapse / duration);

        this._drawFrame(c);
        this._animationId = window.requestAnimationFrame(f);
      };
      f();

      if (this._animation) {
        this._animation.cancel();
      }
      if (this.props.el.animate) {
        this._animation = this.props.el.animate([
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0 },
        ], {
          duration,
        });
      }
    });
  }

  /**
   * @param {ShuchusenContext} c
   */
  _drawFrame (c) {
    const { canvasContext, density } = c;

    canvasContext.clearRect(0, 0, c.width, c.height);
    canvasContext.beginPath();
    canvasContext.strokeStyle = '#0009';

    for (let i = 0; i < density; i += 1) {
      this._strokeOne(c);
    }

    canvasContext.stroke();
  }

  /**
   * @param {ShuchusenProps} props
   * @returns {ShuchusenContext}
   */
  _buildShuchusenContext (props) {
    const canvas = props.el;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get context');
    }

    const w = canvas.width;
    const h = canvas.height;
    const c = {
      accuracy: props.accuracy,
      canvas,
      canvasContext: context,
      centerRadius: props.centerRadius,
      cx: w / 2,
      cy: h / 2,
      density: props.density,
      height: h,
      vmax: Math.sqrt((w ** 2) + (h ** 2)) / 2,
      vmin: Math.min(w, h) / 2,
      width: w,
    };

    return c;
  }

  /**
   * @param {ShuchusenContext} c
   * @param {number} degree
   * @param {number} length
   */
  _strokeOne (
    c,
    degree = Math.random() * Math.PI * 2,
    length = Math.random() * (1 - c.accuracy) + c.centerRadius,
  ) {
    const {
      canvasContext: context,
      cx,
      cy,
      vmax,
      vmin,
    } = c;
    const x0 = cx + Math.cos(degree) * vmax;
    const y0 = cy + Math.sin(degree) * vmax;
    const x1 = cx + length * Math.cos(degree) * vmin;
    const y1 = cy + length * Math.sin(degree) * vmin;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
  }
}
