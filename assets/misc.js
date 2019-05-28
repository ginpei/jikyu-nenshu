/**
 * @param {Element} container
 * @param {string} name
 * @return {any}
 */
export function findElement (container, name) {
  const el = container.querySelector(`[data-js="${name}"]`);
  if (!el) {
    throw new Error(`Element named ${name} is not found`);
  }
  return el;
}

/**
 * @param {Element} container
 * @param {string} name
 * @return {any[]}
 */
export function findAllElements (container, name) {
  // @ts-ignore https://dom.spec.whatwg.org/#interface-nodelist
  const els = [...container.querySelectorAll(`[data-js="${name}"]`)];
  if (els.length < 1) {
    throw new Error(`Elements named ${name} are not found`);
  }
  return els;
}

/**
 * @param {number} n
 */
function deg4 (n) {
  return `000${n}`.slice(-4);
}

/**
 * @param {number} n
 */
export function readableManYen (n) {
  const m = Math.round(n);
  const sen = Math.floor(m / (10000 ** 0)) % 10000;
  const man = Math.floor(m / (10000 ** 1)) % 10000;
  const oku = Math.floor(m / (10000 ** 2)) % 10000;
  const cho = Math.floor(m / (10000 ** 3)) % 10000;

  // ¯\_(ツ)_/¯
  if (cho > 0) {
    return `${cho}兆${deg4(oku)}億${deg4(man)}万${deg4(sen)}`;
  }
  if (oku > 0) {
    return `${oku}億${deg4(man)}万${deg4(sen)}`;
  }
  if (man > 0) {
    return `${man}万${deg4(sen)}`;
  }

  return String(sen);
}
