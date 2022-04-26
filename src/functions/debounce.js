function debounce(fn, timeout = 500) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(()=>{fn(...args)}, timeout);
  };
}

export default debounce;