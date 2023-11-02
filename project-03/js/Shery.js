/*! For license information please see Shery.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(
        require("ControlKit"),
        require("THREE"),
        require("gsap")
      ))
    : "function" == typeof define && define.amd
    ? define("Shery", ["ControlKit", "THREE", "gsap"], t)
    : "object" == typeof exports
    ? (exports.Shery = t(
        require("ControlKit"),
        require("THREE"),
        require("gsap")
      ))
    : (e.Shery = t(e.ControlKit, e.THREE, e.gsap));
})(self, (e, t, n) =>
  (() => {
    var r = {
        593: (e) => {
          e.exports =
            "uniform sampler2D uTexture[16];\nuniform float uIntercept, displaceAmount, scrollType, time, a, b, onMouse, uScroll, uSection;\nuniform bool isMulti, masker, noEffectGooey;\nuniform vec2 mousei;\nuniform float maskVal, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\nvarying vec2 vuv;\n#define SNOISEHOLDER \r\nvoid main() {\n\tvec2 uv = (vuv / 1.1) + .05;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tvec3 v = vec3((vuv.x * 1.) + ((time * a) / 10.), vuv.y, time);\n\tvec2 surface = vec2(snoise(v) * .08, snoise(v) * .01);\n\tsurface = onMouse == 0. ? surface : onMouse == 1. ? mix(vec2(0.), surface, uIntercept) : mix(surface, vec2(0.), uIntercept);\n\tuv += refract(vec2(.0, .0), surface, b);\n\tgl_FragColor = texture2D(uTexture[0], uv);\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\t!isMulti;\n}\n";
        },
        919: (e) => {
          e.exports =
            "varying vec2 vuv;\nvoid main() {\n\tgl_Position = ((projectionMatrix * viewMatrix) * modelMatrix) * vec4(position, 1.);\n\tvuv = uv;\n}\n";
        },
        86: (e) => {
          e.exports =
            "uniform vec2 mouse;\nuniform float resolutionXY, uIntercept, scrollType, displaceAmount, time, frequency, angle, speed, waveFactor, contrast, pixelStrength, quality, brightness, colorExposer, strength, exposer, uScroll, uSection;\nuniform int onMouse, mousemove, mode, modeA, modeN;\nuniform vec2 mousei;\nuniform float maskVal, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\nuniform bool distortion, gooey, masker, noEffectGooey;\nuniform vec3 color;\nvarying vec2 vuv;\nuniform sampler2D uTexture[16];\nfloat mina(vec4 a) {\n\treturn min(min(a.r, a.g), a.b);\n}\nfloat maxa(vec4 a) {\n\treturn max(max(a.r, a.g), a.b);\n}\nvec4 minn(vec4 a, vec4 b) {\n\treturn vec4(min(a.r, b.r), min(a.g, b.g), min(a.b, b.b), 1.);\n}\nvec4 maxx(vec4 a, vec4 b) {\n\treturn vec4(max(a.r, b.r), max(a.g, b.g), max(a.b, b.b), 1.);\n}\nmat2 rotate2D(float r) {\n\treturn mat2(cos(r), sin(r), -sin(r), cos(r));\n}\n#define SNOISEHOLDER \r\nvec4 img(vec2 uv, float c) {\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tvec2 pos = vec2(vuv.x, vuv.y / aspect);\n\tvec2 mouse = vec2(mousei.x, mousei.y / aspect);\n\tvec2 interpole = mix(vec2(0), vec2(metaball, noise_height), uIntercept);\n\tfloat noise = (snoise(vec3(pos * noise_scale, time * noise_speed)) + 1.) / 2.;\n\tfloat val = noise * interpole.y;\n\tfloat u = 1. - smoothstep(interpole.x, .0, distance(mouse, pos));\n\tfloat mouseMetaball = clamp(1. - u, 0., 1.);\n\tval += mouseMetaball;\n\tfloat alpha = smoothstep(discard_threshold - antialias_threshold, discard_threshold, val);\n\tfloat blend = uScroll - uSection;\n\tfloat blend2 = 1. - blend;\n\tvec4 imageA = texture2D(uTexture[0], vec2(uv.x, uv.y - (((texture2D(uTexture[0], uv).r * displaceAmount) * blend) * 2.))) * blend2;\n\tvec4 imageB = texture2D(uTexture[1], vec2(uv.x, uv.y + (((texture2D(uTexture[1], uv).r * displaceAmount) * blend2) * 2.))) * blend;\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\treturn gooey ? vec4(mix(texture2D(uTexture[0], uv), texture2D(uTexture[1], uv2), alpha)) : scrollType == 0. ? mix(texture2D(uTexture[1], uv), texture2D(uTexture[0], uv), step(uScroll - uSection, c + uv.y)) : (((imageA.bbra * blend) + (imageA * blend2)) + (imageB.bbra * blend2)) + (imageB * blend);\n}\nvoid main() {\n\tvec2 resolution = vec2(resolutionXY * 20.);\n\tfloat brightness = clamp(brightness, -1., 25.);\n\tfloat frequency = clamp(frequency, -999., 999.);\n\tfloat contrast = clamp(contrast, -50., 50.);\n\tfloat pixelStrength = clamp(pixelStrength, -20., 999.);\n\tfloat strength = clamp(strength, -100., 100.);\n\tfloat colorExposer = clamp(colorExposer, -5., 5.);\n\tvec2 uv = (.5 * (gl_FragCoord.xy - (.5 * resolution.xy))) / resolution.y;\n\tuv = mousemove != 0 ? mix(uv, ((.5 * (gl_FragCoord.xy - (.5 * resolution.xy))) / resolution.y) + (mouse.xy / 300.), uIntercept) : uv;\n\tfloat c = ((sin(((uv.x * 7.) * snoise(vec3(uv, 1.))) + time) / 15.) * snoise(vec3(uv, 1.))) + .01;\n\tvec3 col = vec3(0);\n\tvec2 n, q = vec2(0);\n\tvec2 p = uv + (brightness / 10.);\n\tfloat d = dot(p, p);\n\tfloat a = -(contrast / 100.);\n\tmat2 angle = rotate2D(angle);\n\tfor (float i = 1.; i <= 10.; i++) {\n\t\tif (i > quality)\n\t\t\tbreak;\n\t\tp, n *= angle;\n\t\tif (mousemove == 0)\n\t\t\tq = (((p * frequency) + (time * speed)) + ((sin(time) * .0018) * i)) - (pixelStrength * n);\n\t\tif (mousemove == 1)\n\t\t\tq = ((((p * frequency) + (time * speed)) + ((sin(time) * .0018) * i)) + mouse) - (pixelStrength * n);\n\t\tif (mousemove == 2)\n\t\t\tq = ((((p * frequency) + (time * speed)) + ((sin(time) * .0018) * i)) - pixelStrength) + (mouse * n);\n\t\tif (mousemove == 3)\n\t\t\tq = (((((p * frequency) + (time * speed)) + ((sin(time) * .0018) * i)) + mouse) - pixelStrength) + (mouse * n);\n\t\tif (modeA == 0)\n\t\t\ta += dot(sin(q) / frequency, vec2(strength));\n\t\telse if (modeA == 1)\n\t\t\ta += dot(cos(q) / frequency, vec2(strength));\n\t\telse if (modeA == 2)\n\t\t\ta += dot(tan(q) / frequency, vec2(strength));\n\t\telse if (modeA == 3)\n\t\t\ta += dot(atan(q) / frequency, vec2(strength));\n\t\tif (modeN == 0)\n\t\t\tn -= sin(q);\n\t\telse if (modeN == 1)\n\t\t\tn -= cos(q);\n\t\telse if (modeN == 2)\n\t\t\tn -= tan(q);\n\t\telse if (modeN == 3)\n\t\t\tn -= atan(q);\n\t\tn = mousemove != 0 ? mix(n + mouse, n, uIntercept) : n;\n\t\tfrequency *= waveFactor;\n\t}\n\tcol = ((((color * 4.5) * (a + colorExposer)) + (exposer * a)) + a) + d;\n\tvec4 base = distortion ? img((vuv + a) + (contrast / 100.), c) : img(vuv, c);\n\tbase = onMouse == 0 ? base : onMouse == 1 ? mix(img(vuv, c), base, uIntercept) : mix(base, img(vuv, c), uIntercept);\n\tvec4 blend = vec4(col, 1.);\n\tvec4 final = mix(base, gl_FragColor, uIntercept);\n\tif (mode == -10)\n\t\tfinal = base;\n\telse if (mode == -1)\n\t\tfinal = (minn(base, blend) - maxx(base, blend)) + vec4(1.);\n\telse if (mode == -9)\n\t\tfinal = maxa(blend) == 1. ? blend : minn((base * base) / (1. - blend), vec4(1.));\n\telse if (mode == -8)\n\t\tfinal = (base + blend) - ((2. * base) * blend);\n\telse if (mode == -7)\n\t\tfinal = abs(base - blend);\n\telse if (mode == -6)\n\t\tfinal = minn(base, blend);\n\telse if (mode == -5)\n\t\tfinal = mina(blend) == 0. ? blend : maxx(1. - ((1. - base) / blend), vec4(0.));\n\telse if (mode == -4)\n\t\tfinal = maxa(base) == 1. ? blend : minn(base / (1. - blend), vec4(1.));\n\telse if (mode == -3)\n\t\tfinal = (((1. - (2. * blend)) * base) * base) + ((2. * base) * blend);\n\telse if (mode == -2)\n\t\tfinal = maxa(base) < .5 ? (2. * base) * blend : 1. - ((2. * (1. - base)) * (1. - blend));\n\telse if (mode == 0)\n\t\tfinal = base + blend;\n\telse if (mode == 1)\n\t\tfinal = base * blend;\n\telse if (mode == 2)\n\t\tfinal = 1. - ((1. - base) * (1. - blend));\n\telse if (mode == 3)\n\t\tfinal = blend - base;\n\telse if (mode == 4)\n\t\tfinal = base / blend;\n\telse if (mode == 5)\n\t\tfinal = maxx((base + blend) - 1., vec4(0.));\n\telse if (mode == 6)\n\t\tfinal = (base + (blend / base)) - .55;\n\telse if (mode == 7)\n\t\tfinal = base + (blend * base);\n\telse if (mode == 8)\n\t\tfinal = mod(base, blend);\n\telse if (mode == 9)\n\t\tfinal = (1. - (base + (blend / base))) + .5;\n\telse if (mode == 10)\n\t\tfinal = blend - (base * blend);\n\telse if (mode == 11)\n\t\tfinal = base + (blend / 2.);\n\tfinal = mix(final * brightness, mix(maxx(final, vec4(1.)), final, contrast), .5);\n\tfinal = onMouse == 0 ? final : onMouse == 1 ? mix(base, final, uIntercept) : mix(final, base, uIntercept);\n\tgl_FragColor = final;\n}\n";
        },
        444: (e) => {
          e.exports =
            "varying vec2 vuv;\nvoid main() {\n\tgl_Position = ((projectionMatrix * viewMatrix) * modelMatrix) * vec4(position, 1.);\n\tvuv = uv;\n}\n";
        },
        168: (e) => {
          e.exports =
            "uniform sampler2D uTexture[16];\nuniform float scrollType, displaceAmount, uScroll, uSection, time;\nuniform bool isMulti, masker, noEffectGooey;\nuniform vec2 mousei;\nuniform float uIntercept, maskVal, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\n#define SNOISEHOLDER \r\nvarying vec2 vuv;\nvoid main() {\n\tvec2 uv = vuv;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tgl_FragColor = texture2D(uTexture[0], uv);\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\t!isMulti;\n}\n";
        },
        367: (e) => {
          e.exports =
            "uniform float uFrequencyX, uFrequencyY, uFrequencyZ, time, uIntercept;\nuniform int onMouse;\nvarying vec2 vuv;\nvoid main() {\n\tvec3 uFrequency = vec3(uFrequencyX / 500., uFrequencyY / 500., uFrequencyZ * 10.0);\n\tvec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\tfloat elevation = (sin((modelPosition.x * uFrequency.x) - time) * uFrequency.z) / 1000.0;\n\televation += ((sin((modelPosition.y * uFrequency.y) - time) * uFrequency.z) / 1000.0);\n\tmodelPosition.z += elevation;\n\tmodelPosition = onMouse == 0 ? modelPosition : onMouse == 1 ? mix(modelMatrix * vec4(position, 1.0), modelPosition, uIntercept) : mix(modelPosition, modelMatrix * vec4(position, 1.0), uIntercept);\n\tgl_Position = (projectionMatrix * viewMatrix) * modelPosition;\n\tvuv = uv;\n}\n";
        },
        924: (e) => {
          e.exports =
            "uniform sampler2D uTexture[16];\nuniform float scrollType, displaceAmount, uScroll, uSection, time;\nuniform bool isMulti, masker, noEffectGooey, uColor;\nuniform vec2 mousei;\nvarying float vWave;\nuniform float uIntercept, maskVal, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\n#define SNOISEHOLDER \r\nvarying vec2 vuv;\nvoid main() {\n\tvec2 uv = vuv;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tgl_FragColor = texture2D(uTexture[0], uv);\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\t!isMulti;\n\tgl_FragColor = uColor ? mix(gl_FragColor, vec4(1.), vWave) : gl_FragColor;\n}\n";
        },
        850: (e) => {
          e.exports =
            "varying vec2 vuv;\nvarying float vWave;\nuniform float time, uFrequency, uAmplitude, uSpeed, uIntercept, scrollType, onMouse;\n#define SNOISEHOLDER \r\nvoid main() {\n\tvuv = uv;\n\tvec3 pos = position;\n\tfloat noiseFreq = uFrequency;\n\tfloat noiseAmp = uAmplitude / 10.;\n\tvec3 noisePos = vec3((pos.x * noiseFreq) + (time * uSpeed), pos.y, pos.z);\n\tpos.z += (snoise(noisePos) * noiseAmp);\n\tpos = onMouse == 0. ? pos : onMouse == 1. ? mix(position, pos, uIntercept) : mix(pos, position, uIntercept);\n\tvWave = pos.z;\n\tgl_Position = (projectionMatrix * modelViewMatrix) * vec4(pos, 1.);\n}\n";
        },
        575: (e) => {
          e.exports =
            "uniform sampler2D uTexture[16];\nuniform float maskVal, uIntercept, displaceAmount, scrollType, time, a, b, onMouse, uScroll, uSection;\nuniform bool isMulti, masker, noEffectGooey;\nuniform vec2 mousei;\nuniform float aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\nuniform vec2 mouse, mousem;\nvarying vec2 vuv;\n#define SNOISEHOLDER \r\nfloat cnoise(vec2 P) {\n\treturn snoise(vec3(P, 1.));\n}\nvoid main() {\n\tvec2 uv = (vuv / 1.1) + .05;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tfloat time = time * a;\n\tvec2 surface = vec2(cnoise((uv - ((mouse / 2.) / 7.)) + (.2 * time)) * .08, cnoise((uv - ((mouse / 2.) / 7.)) + (.2 * time)) * .08);\n\tsurface = onMouse == 0. ? surface : onMouse == 1. ? mix(vec2(0.), surface, uIntercept) : mix(surface, vec2(0.), uIntercept);\n\tuv += refract(vec2(mousem), surface, b);\n\tgl_FragColor = texture2D(uTexture[0], uv);\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\t!isMulti;\n}\n";
        },
        136: (e) => {
          e.exports =
            "varying vec2 vuv;\nvoid main() {\n\tgl_Position = ((projectionMatrix * viewMatrix) * modelMatrix) * vec4(position, 1.);\n\tvuv = uv;\n}\n";
        },
        479: (e) => {
          e.exports =
            "precision mediump float;\nuniform sampler2D uTexture[16];\nuniform float maskVal, time, uIntercept, displaceAmount, scrollType, onMouse, uScroll, uSection, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\nuniform bool isMulti, masker, noEffectGooey;\nuniform vec2 mousei;\nvarying vec2 vuv;\nuniform float noiseDetail;\nuniform float distortionAmount;\nuniform float scale, speed;\n#define SNOISEHOLDER\nvoid main() {\n\tvec2 uv = vuv;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tfloat x = ((((uv.x - .5) * scale) * (noiseDetail / 100.)) * sin(time)) * speed;\n\tfloat y = ((((uv.y - .5) * scale) * (noiseDetail / 100.)) * cos(time)) * speed;\n\tuv += (snoise(vec3(x, y, 0.)) * (distortionAmount / 100.));\n\tgl_FragColor = texture2D(uTexture[0], uv);\n\tvec2 uv2 = noEffectGooey ? vuv : uv;\n\t!isMulti;\n}\n";
        },
        908: (e) => {
          e.exports =
            "varying vec2 vuv;\nvoid main() {\n\tvec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\tvec4 viewPosition = viewMatrix * modelPosition;\n\tvec4 projectedPosition = projectionMatrix * viewPosition;\n\tgl_Position = projectedPosition;\n\tvuv = uv;\n}\n";
        },
        330: (e) => {
          e.exports =
            "varying vec2 vuv;\nuniform float maskVal, time, uIntercept, displaceAmount, scrollType, onMouse, uScroll, uSection, aspect, noise_speed, metaball, discard_threshold, antialias_threshold, noise_height, noise_scale;\nuniform bool isMulti, masker, noEffectGooey;\nuniform vec2 mousei;\nuniform float rotation, pattern, scale, density, clustering, gapping, smoothness, styling, circular, mouseMoveEWX, mouseMoveEHY;\nuniform bool invert, autorotate, isTexture, mouseMove, gooey;\nuniform vec3 color;\nuniform sampler2D uTexture[16];\n#define SNOISEHOLDER\nvoid main() {\n\tvec2 uv = vuv;\n\tuv = (uv * 2.) - 1.;\n\tuv = masker ? mix(uv, uv / max(1., maskVal), uIntercept) : uv / max(1., maskVal);\n\tuv = (uv * .5) + .5;\n\tvec2 uvx = uv;\n\tuv -= vec2(.5, .5);\n\tfloat m = mouseMove ? smoothstep(mouseMoveEWX, mouseMoveEHY, length(uvx - mousei)) : 1.;\n\tfloat rot = radians(rotation);\n\trot -= radians(autorotate ? time : 0.);\n\tmat2 rotation_matrix = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));\n\tuv = rotation_matrix * uv;\n\tvec2 scaled_uv = ((1. - scale) + 1.) * uv;\n\tvec2 tile = fract(scaled_uv);\n\tfloat tile_dist = min(min(tile.x, 1. - tile.x), min(tile.y, 1. - tile.y));\n\tfloat square_dist = length(floor(scaled_uv));\n\tfloat edge = sin(time - (square_dist * pattern));\n\tedge = mod(edge * edge, edge / edge);\n\tfloat value = mix(tile_dist, 1. - tile_dist, step(density, edge));\n\tedge = pow(abs(1. - (edge * m)), clustering * m) * gapping;\n\tvalue = smoothstep(edge - (smoothness * m), edge, styling * value);\n\tvalue += (square_dist * circular);\n\tvec4 t = texture2D(uTexture[0], uvx);\n\tvec4 col = isTexture ? texture2D(uTexture[2], uvx) : vec4(color, 1.);\n\tif (isMulti && !gooey) {\n\t\tfloat c = ((sin(((uv.x * 7.) * snoise(vec3(uv, 1.))) + time) / 15.) * snoise(vec3(uv, 1.))) + .01;\n\t\tfloat blend = uScroll - uSection;\n\t\tfloat blend2 = 1. - blend;\n\t\tvec4 imageA = texture2D(uTexture[0], vec2(uvx.x, uvx.y - (((texture2D(uTexture[0], uvx).r * displaceAmount) * blend) * 2.))) * blend2;\n\t\tvec4 imageB = texture2D(uTexture[1], vec2(uvx.x, uvx.y + (((texture2D(uTexture[1], uvx).r * displaceAmount) * blend2) * 2.))) * blend;\n\t\tgl_FragColor = scrollType == 0. ? mix(texture2D(uTexture[1], uvx), texture2D(uTexture[0], uvx), step(uScroll - uSection, sin(c) + uvx.y)) : (((imageA.bbra * blend) + (imageA * blend2)) + (imageB.bbra * blend2)) + (imageB * blend);\n\t\tgl_FragColor = invert ? mix(gl_FragColor, col, value) : mix(col, gl_FragColor, value);\n\t}\n\telse {\n\t\tgl_FragColor = invert ? mix(t, col, value) : mix(col, t, value);\n\t}\n\tif (gooey) {\n\t\tvec2 pos = vec2(vuv.x, vuv.y / aspect);\n\t\tvec2 mouse = vec2(mousei.x, mousei.y / aspect);\n\t\tvec2 interpole = mix(vec2(0), vec2(metaball, noise_height), uIntercept);\n\t\tfloat noise = (snoise(vec3(pos * noise_scale, time * noise_speed)) + 1.) / 2.;\n\t\tfloat val = noise * interpole.y;\n\t\tfloat u = 1. - smoothstep(interpole.x, .0, distance(mouse, pos));\n\t\tfloat mouseMetaball = clamp(1. - u, 0., 1.);\n\t\tval += mouseMetaball;\n\t\tfloat alpha = smoothstep(discard_threshold - antialias_threshold, discard_threshold, val);\n\t\tgl_FragColor = vec4(mix(gl_FragColor, invert ? mix(texture2D(uTexture[1], uvx), col, value) : mix(col, texture2D(uTexture[1], uvx), value), alpha));\n\t}\n}\n";
        },
        102: (e) => {
          e.exports =
            "varying vec2 vuv;\nvoid main() {\n\tvec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\tvec4 viewPosition = viewMatrix * modelPosition;\n\tvec4 projectedPosition = projectionMatrix * viewPosition;\n\tgl_Position = projectedPosition;\n\tvuv = uv;\n}\n";
        },
        160: (t) => {
          "use strict";
          t.exports = e;
        },
        824: (e) => {
          "use strict";
          e.exports = t;
        },
        163: (e) => {
          "use strict";
          e.exports = n;
        },
      },
      i = {};
    function a(e) {
      var t = i[e];
      if (void 0 !== t) return t.exports;
      var n = (i[e] = { exports: {} });
      return r[e](n, n.exports, a), n.exports;
    }
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
      (a.d = (e, t) => {
        for (var n in t)
          a.o(t, n) &&
            !a.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (a.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var o = {};
    return (
      (() => {
        "use strict";
        a.r(o),
          a.d(o, {
            ScrollPos: () => Er,
            default: () => kr,
            hoverWithMediaCircle: () => xr,
            imageEffect: () => Cr,
            imageMasker: () => _r,
            makeMagnet: () => yr,
            mouseFollower: () => gr,
            textAnimate: () => br,
          });
        var e = {};
        a.r(e),
          a.d(e, {
            ScrollPos: () => Er,
            hoverWithMediaCircle: () => xr,
            imageEffect: () => Cr,
            imageMasker: () => _r,
            makeMagnet: () => yr,
            mouseFollower: () => gr,
            textAnimate: () => br,
          });
        var t = a(163),
          n = a.n(t),
          r = a(824),
          i = a(919),
          s = a.n(i),
          l = a(593),
          u = a.n(l),
          c = a(444),
          d = a.n(c),
          h = a(86),
          v = a.n(h),
          m = a(367),
          p = a.n(m),
          f = a(168),
          g = a.n(f),
          _ = a(850),
          y = a.n(_),
          b = a(924),
          x = a.n(b),
          S = a(136),
          T = a.n(S),
          w = a(575),
          M = a.n(w),
          C = a(908),
          E = a.n(C),
          k = a(479),
          D = a.n(k),
          A = a(102),
          q = a.n(A),
          O = a(330),
          P = a.n(O),
          R = a(160),
          F = a.n(R);
        function I(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function L(e, t) {
          (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            (e.__proto__ = t);
        }
        var z,
          N,
          B,
          V,
          j,
          K,
          Y,
          G,
          X,
          H,
          U,
          W,
          Z,
          Q,
          J,
          $ = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: { lineHeight: "" },
          },
          ee = { duration: 0.5, overwrite: !1, delay: 0 },
          te = 1e8,
          ne = 1e-8,
          re = 2 * Math.PI,
          ie = re / 4,
          ae = 0,
          oe = Math.sqrt,
          se = Math.cos,
          le = Math.sin,
          ue = function (e) {
            return "string" == typeof e;
          },
          ce = function (e) {
            return "function" == typeof e;
          },
          de = function (e) {
            return "number" == typeof e;
          },
          he = function (e) {
            return void 0 === e;
          },
          ve = function (e) {
            return "object" == typeof e;
          },
          me = function (e) {
            return !1 !== e;
          },
          pe = function () {
            return "undefined" != typeof window;
          },
          fe = function (e) {
            return ce(e) || ue(e);
          },
          ge =
            ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
            function () {},
          _e = Array.isArray,
          ye = /(?:-?\.?\d|\.)+/gi,
          be = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
          xe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
          Se = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
          Te = /[+-]=-?[.\d]+/,
          we = /[^,'"\[\]\s]+/gi,
          Me = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
          Ce = {},
          Ee = {},
          ke = function (e) {
            return (Ee = rt(e, Ce)) && ir;
          },
          De = function (e, t) {
            return console.warn(
              "Invalid property",
              e,
              "set to",
              t,
              "Missing plugin? gsap.registerPlugin()"
            );
          },
          Ae = function (e, t) {
            return !t && console.warn(e);
          },
          qe = function (e, t) {
            return (e && (Ce[e] = t) && Ee && (Ee[e] = t)) || Ce;
          },
          Oe = function () {
            return 0;
          },
          Pe = { suppressEvents: !0, isStart: !0, kill: !1 },
          Re = { suppressEvents: !0, kill: !1 },
          Fe = { suppressEvents: !0 },
          Ie = {},
          Le = [],
          ze = {},
          Ne = {},
          Be = {},
          Ve = 30,
          je = [],
          Ke = "",
          Ye = function (e) {
            var t,
              n,
              r = e[0];
            if ((ve(r) || ce(r) || (e = [e]), !(t = (r._gsap || {}).harness))) {
              for (n = je.length; n-- && !je[n].targetTest(r); );
              t = je[n];
            }
            for (n = e.length; n--; )
              (e[n] && (e[n]._gsap || (e[n]._gsap = new _n(e[n], t)))) ||
                e.splice(n, 1);
            return e;
          },
          Ge = function (e) {
            return e._gsap || Ye(Ft(e))[0]._gsap;
          },
          Xe = function (e, t, n) {
            return (n = e[t]) && ce(n)
              ? e[t]()
              : (he(n) && e.getAttribute && e.getAttribute(t)) || n;
          },
          He = function (e, t) {
            return (e = e.split(",")).forEach(t) || e;
          },
          Ue = function (e) {
            return Math.round(1e5 * e) / 1e5 || 0;
          },
          We = function (e) {
            return Math.round(1e7 * e) / 1e7 || 0;
          },
          Ze = function (e, t) {
            var n = t.charAt(0),
              r = parseFloat(t.substr(2));
            return (
              (e = parseFloat(e)),
              "+" === n ? e + r : "-" === n ? e - r : "*" === n ? e * r : e / r
            );
          },
          Qe = function (e, t) {
            for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n; );
            return r < n;
          },
          Je = function () {
            var e,
              t,
              n = Le.length,
              r = Le.slice(0);
            for (ze = {}, Le.length = 0, e = 0; e < n; e++)
              (t = r[e]) &&
                t._lazy &&
                (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
          },
          $e = function (e, t, n, r) {
            Le.length && !N && Je(),
              e.render(t, n, r || (N && t < 0 && (e._initted || e._startAt))),
              Le.length && !N && Je();
          },
          et = function (e) {
            var t = parseFloat(e);
            return (t || 0 === t) && (e + "").match(we).length < 2
              ? t
              : ue(e)
              ? e.trim()
              : e;
          },
          tt = function (e) {
            return e;
          },
          nt = function (e, t) {
            for (var n in t) n in e || (e[n] = t[n]);
            return e;
          },
          rt = function (e, t) {
            for (var n in t) e[n] = t[n];
            return e;
          },
          it = function e(t, n) {
            for (var r in n)
              "__proto__" !== r &&
                "constructor" !== r &&
                "prototype" !== r &&
                (t[r] = ve(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
            return t;
          },
          at = function (e, t) {
            var n,
              r = {};
            for (n in e) n in t || (r[n] = e[n]);
            return r;
          },
          ot = function (e) {
            var t,
              n = e.parent || V,
              r = e.keyframes
                ? ((t = _e(e.keyframes)),
                  function (e, n) {
                    for (var r in n)
                      r in e ||
                        ("duration" === r && t) ||
                        "ease" === r ||
                        (e[r] = n[r]);
                  })
                : nt;
            if (me(e.inherit))
              for (; n; ) r(e, n.vars.defaults), (n = n.parent || n._dp);
            return e;
          },
          st = function (e, t, n, r, i) {
            void 0 === n && (n = "_first"), void 0 === r && (r = "_last");
            var a,
              o = e[r];
            if (i) for (a = t[i]; o && o[i] > a; ) o = o._prev;
            return (
              o
                ? ((t._next = o._next), (o._next = t))
                : ((t._next = e[n]), (e[n] = t)),
              t._next ? (t._next._prev = t) : (e[r] = t),
              (t._prev = o),
              (t.parent = t._dp = e),
              t
            );
          },
          lt = function (e, t, n, r) {
            void 0 === n && (n = "_first"), void 0 === r && (r = "_last");
            var i = t._prev,
              a = t._next;
            i ? (i._next = a) : e[n] === t && (e[n] = a),
              a ? (a._prev = i) : e[r] === t && (e[r] = i),
              (t._next = t._prev = t.parent = null);
          },
          ut = function (e, t) {
            e.parent &&
              (!t || e.parent.autoRemoveChildren) &&
              e.parent.remove &&
              e.parent.remove(e),
              (e._act = 0);
          },
          ct = function (e, t) {
            if (e && (!t || t._end > e._dur || t._start < 0))
              for (var n = e; n; ) (n._dirty = 1), (n = n.parent);
            return e;
          },
          dt = function (e, t, n, r) {
            return (
              e._startAt &&
              (N
                ? e._startAt.revert(Re)
                : (e.vars.immediateRender && !e.vars.autoRevert) ||
                  e._startAt.render(t, !0, r))
            );
          },
          ht = function e(t) {
            return !t || (t._ts && e(t.parent));
          },
          vt = function (e) {
            return e._repeat
              ? mt(e._tTime, (e = e.duration() + e._rDelay)) * e
              : 0;
          },
          mt = function (e, t) {
            var n = Math.floor((e /= t));
            return e && n === e ? n - 1 : n;
          },
          pt = function (e, t) {
            return (
              (e - t._start) * t._ts +
              (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
            );
          },
          ft = function (e) {
            return (e._end = We(
              e._start + (e._tDur / Math.abs(e._ts || e._rts || ne) || 0)
            ));
          },
          gt = function (e, t) {
            var n = e._dp;
            return (
              n &&
                n.smoothChildTiming &&
                e._ts &&
                ((e._start = We(
                  n._time -
                    (e._ts > 0
                      ? t / e._ts
                      : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
                )),
                ft(e),
                n._dirty || ct(n, e)),
              e
            );
          },
          _t = function (e, t) {
            var n;
            if (
              ((t._time ||
                (!t._dur && t._initted) ||
                (t._start < e._time && (t._dur || !t.add))) &&
                ((n = pt(e.rawTime(), t)),
                (!t._dur || At(0, t.totalDuration(), n) - t._tTime > ne) &&
                  t.render(n, !0)),
              ct(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
            ) {
              if (e._dur < e.duration())
                for (n = e; n._dp; )
                  n.rawTime() >= 0 && n.totalTime(n._tTime), (n = n._dp);
              e._zTime = -1e-8;
            }
          },
          yt = function (e, t, n, r) {
            return (
              t.parent && ut(t),
              (t._start = We(
                (de(n) ? n : n || e !== V ? Et(e, n, t) : e._time) + t._delay
              )),
              (t._end = We(
                t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
              )),
              st(e, t, "_first", "_last", e._sort ? "_start" : 0),
              Tt(t) || (e._recent = t),
              r || _t(e, t),
              e._ts < 0 && gt(e, e._tTime),
              e
            );
          },
          bt = function (e, t) {
            return (
              (Ce.ScrollTrigger || De("scrollTrigger", t)) &&
              Ce.ScrollTrigger.create(t, e)
            );
          },
          xt = function (e, t, n, r, i) {
            return (
              Cn(e, t, i),
              e._initted
                ? !n &&
                  e._pt &&
                  !N &&
                  ((e._dur && !1 !== e.vars.lazy) ||
                    (!e._dur && e.vars.lazy)) &&
                  X !== an.frame
                  ? (Le.push(e), (e._lazy = [i, r]), 1)
                  : void 0
                : 1
            );
          },
          St = function e(t) {
            var n = t.parent;
            return (
              n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n))
            );
          },
          Tt = function (e) {
            var t = e.data;
            return "isFromStart" === t || "isStart" === t;
          },
          wt = function (e, t, n, r) {
            var i = e._repeat,
              a = We(t) || 0,
              o = e._tTime / e._tDur;
            return (
              o && !r && (e._time *= a / e._dur),
              (e._dur = a),
              (e._tDur = i
                ? i < 0
                  ? 1e10
                  : We(a * (i + 1) + e._rDelay * i)
                : a),
              o > 0 && !r && gt(e, (e._tTime = e._tDur * o)),
              e.parent && ft(e),
              n || ct(e.parent, e),
              e
            );
          },
          Mt = function (e) {
            return e instanceof bn ? ct(e) : wt(e, e._dur);
          },
          Ct = { _start: 0, endTime: Oe, totalDuration: Oe },
          Et = function e(t, n, r) {
            var i,
              a,
              o,
              s = t.labels,
              l = t._recent || Ct,
              u = t.duration() >= te ? l.endTime(!1) : t._dur;
            return ue(n) && (isNaN(n) || n in s)
              ? ((a = n.charAt(0)),
                (o = "%" === n.substr(-1)),
                (i = n.indexOf("=")),
                "<" === a || ">" === a
                  ? (i >= 0 && (n = n.replace(/=/, "")),
                    ("<" === a ? l._start : l.endTime(l._repeat >= 0)) +
                      (parseFloat(n.substr(1)) || 0) *
                        (o ? (i < 0 ? l : r).totalDuration() / 100 : 1))
                  : i < 0
                  ? (n in s || (s[n] = u), s[n])
                  : ((a = parseFloat(n.charAt(i - 1) + n.substr(i + 1))),
                    o &&
                      r &&
                      (a = (a / 100) * (_e(r) ? r[0] : r).totalDuration()),
                    i > 1 ? e(t, n.substr(0, i - 1), r) + a : u + a))
              : null == n
              ? u
              : +n;
          },
          kt = function (e, t, n) {
            var r,
              i,
              a = de(t[1]),
              o = (a ? 2 : 1) + (e < 2 ? 0 : 1),
              s = t[o];
            if ((a && (s.duration = t[1]), (s.parent = n), e)) {
              for (r = s, i = n; i && !("immediateRender" in r); )
                (r = i.vars.defaults || {}),
                  (i = me(i.vars.inherit) && i.parent);
              (s.immediateRender = me(r.immediateRender)),
                e < 2 ? (s.runBackwards = 1) : (s.startAt = t[o - 1]);
            }
            return new qn(t[0], s, t[o + 1]);
          },
          Dt = function (e, t) {
            return e || 0 === e ? t(e) : t;
          },
          At = function (e, t, n) {
            return n < e ? e : n > t ? t : n;
          },
          qt = function (e, t) {
            return ue(e) && (t = Me.exec(e)) ? t[1] : "";
          },
          Ot = [].slice,
          Pt = function (e, t) {
            return (
              e &&
              ve(e) &&
              "length" in e &&
              ((!t && !e.length) || (e.length - 1 in e && ve(e[0]))) &&
              !e.nodeType &&
              e !== j
            );
          },
          Rt = function (e, t, n) {
            return (
              void 0 === n && (n = []),
              e.forEach(function (e) {
                var r;
                return (ue(e) && !t) || Pt(e, 1)
                  ? (r = n).push.apply(r, Ft(e))
                  : n.push(e);
              }) || n
            );
          },
          Ft = function (e, t, n) {
            return B && !t && B.selector
              ? B.selector(e)
              : !ue(e) || n || (!K && on())
              ? _e(e)
                ? Rt(e, n)
                : Pt(e)
                ? Ot.call(e, 0)
                : e
                ? [e]
                : []
              : Ot.call((t || Y).querySelectorAll(e), 0);
          },
          It = function (e) {
            return (
              (e = Ft(e)[0] || Ae("Invalid scope") || {}),
              function (t) {
                var n = e.current || e.nativeElement || e;
                return Ft(
                  t,
                  n.querySelectorAll
                    ? n
                    : n === e
                    ? Ae("Invalid scope") || Y.createElement("div")
                    : e
                );
              }
            );
          },
          Lt = function (e) {
            return e.sort(function () {
              return 0.5 - Math.random();
            });
          },
          zt = function (e) {
            if (ce(e)) return e;
            var t = ve(e) ? e : { each: e },
              n = vn(t.ease),
              r = t.from || 0,
              i = parseFloat(t.base) || 0,
              a = {},
              o = r > 0 && r < 1,
              s = isNaN(r) || o,
              l = t.axis,
              u = r,
              c = r;
            return (
              ue(r)
                ? (u = c = { center: 0.5, edges: 0.5, end: 1 }[r] || 0)
                : !o && s && ((u = r[0]), (c = r[1])),
              function (e, o, d) {
                var h,
                  v,
                  m,
                  p,
                  f,
                  g,
                  _,
                  y,
                  b,
                  x = (d || t).length,
                  S = a[x];
                if (!S) {
                  if (!(b = "auto" === t.grid ? 0 : (t.grid || [1, te])[1])) {
                    for (
                      _ = -te;
                      _ < (_ = d[b++].getBoundingClientRect().left) && b < x;

                    );
                    b--;
                  }
                  for (
                    S = a[x] = [],
                      h = s ? Math.min(b, x) * u - 0.5 : r % b,
                      v = b === te ? 0 : s ? (x * c) / b - 0.5 : (r / b) | 0,
                      _ = 0,
                      y = te,
                      g = 0;
                    g < x;
                    g++
                  )
                    (m = (g % b) - h),
                      (p = v - ((g / b) | 0)),
                      (S[g] = f = l
                        ? Math.abs("y" === l ? p : m)
                        : oe(m * m + p * p)),
                      f > _ && (_ = f),
                      f < y && (y = f);
                  "random" === r && Lt(S),
                    (S.max = _ - y),
                    (S.min = y),
                    (S.v = x =
                      (parseFloat(t.amount) ||
                        parseFloat(t.each) *
                          (b > x
                            ? x - 1
                            : l
                            ? "y" === l
                              ? x / b
                              : b
                            : Math.max(b, x / b)) ||
                        0) * ("edges" === r ? -1 : 1)),
                    (S.b = x < 0 ? i - x : i),
                    (S.u = qt(t.amount || t.each) || 0),
                    (n = n && x < 0 ? dn(n) : n);
                }
                return (
                  (x = (S[e] - S.min) / S.max || 0),
                  We(S.b + (n ? n(x) : x) * S.v) + S.u
                );
              }
            );
          },
          Nt = function (e) {
            var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
            return function (n) {
              var r = We(Math.round(parseFloat(n) / e) * e * t);
              return (r - (r % 1)) / t + (de(n) ? 0 : qt(n));
            };
          },
          Bt = function (e, t) {
            var n,
              r,
              i = _e(e);
            return (
              !i &&
                ve(e) &&
                ((n = i = e.radius || te),
                e.values
                  ? ((e = Ft(e.values)), (r = !de(e[0])) && (n *= n))
                  : (e = Nt(e.increment))),
              Dt(
                t,
                i
                  ? ce(e)
                    ? function (t) {
                        return (r = e(t)), Math.abs(r - t) <= n ? r : t;
                      }
                    : function (t) {
                        for (
                          var i,
                            a,
                            o = parseFloat(r ? t.x : t),
                            s = parseFloat(r ? t.y : 0),
                            l = te,
                            u = 0,
                            c = e.length;
                          c--;

                        )
                          (i = r
                            ? (i = e[c].x - o) * i + (a = e[c].y - s) * a
                            : Math.abs(e[c] - o)) < l && ((l = i), (u = c));
                        return (
                          (u = !n || l <= n ? e[u] : t),
                          r || u === t || de(t) ? u : u + qt(t)
                        );
                      }
                  : Nt(e)
              )
            );
          },
          Vt = function (e, t, n, r) {
            return Dt(_e(e) ? !t : !0 === n ? !!(n = 0) : !r, function () {
              return _e(e)
                ? e[~~(Math.random() * e.length)]
                : (n = n || 1e-5) &&
                    (r = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) &&
                    Math.floor(
                      Math.round(
                        (e - n / 2 + Math.random() * (t - e + 0.99 * n)) / n
                      ) *
                        n *
                        r
                    ) / r;
            });
          },
          jt = function (e, t, n) {
            return Dt(n, function (n) {
              return e[~~t(n)];
            });
          },
          Kt = function (e) {
            for (
              var t, n, r, i, a = 0, o = "";
              ~(t = e.indexOf("random(", a));

            )
              (r = e.indexOf(")", t)),
                (i = "[" === e.charAt(t + 7)),
                (n = e.substr(t + 7, r - t - 7).match(i ? we : ye)),
                (o +=
                  e.substr(a, t - a) +
                  Vt(i ? n : +n[0], i ? 0 : +n[1], +n[2] || 1e-5)),
                (a = r + 1);
            return o + e.substr(a, e.length - a);
          },
          Yt = function (e, t, n, r, i) {
            var a = t - e,
              o = r - n;
            return Dt(i, function (t) {
              return n + (((t - e) / a) * o || 0);
            });
          },
          Gt = function (e, t, n) {
            var r,
              i,
              a,
              o = e.labels,
              s = te;
            for (r in o)
              (i = o[r] - t) < 0 == !!n &&
                i &&
                s > (i = Math.abs(i)) &&
                ((a = r), (s = i));
            return a;
          },
          Xt = function (e, t, n) {
            var r,
              i,
              a,
              o = e.vars,
              s = o[t],
              l = B,
              u = e._ctx;
            if (s)
              return (
                (r = o[t + "Params"]),
                (i = o.callbackScope || e),
                n && Le.length && Je(),
                u && (B = u),
                (a = r ? s.apply(i, r) : s.call(i)),
                (B = l),
                a
              );
          },
          Ht = function (e) {
            return (
              ut(e),
              e.scrollTrigger && e.scrollTrigger.kill(!!N),
              e.progress() < 1 && Xt(e, "onInterrupt"),
              e
            );
          },
          Ut = [],
          Wt = function (e) {
            if (pe() && e) {
              var t = (e = (!e.name && e.default) || e).name,
                n = ce(e),
                r =
                  t && !n && e.init
                    ? function () {
                        this._props = [];
                      }
                    : e,
                i = {
                  init: Oe,
                  render: Bn,
                  add: wn,
                  kill: jn,
                  modifier: Vn,
                  rawVars: 0,
                },
                a = {
                  targetTest: 0,
                  get: 0,
                  getSetter: In,
                  aliases: {},
                  register: 0,
                };
              if ((on(), e !== r)) {
                if (Ne[t]) return;
                nt(r, nt(at(e, i), a)),
                  rt(r.prototype, rt(i, at(e, a))),
                  (Ne[(r.prop = t)] = r),
                  e.targetTest && (je.push(r), (Ie[t] = 1)),
                  (t =
                    ("css" === t
                      ? "CSS"
                      : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin");
              }
              qe(t, r), e.register && e.register(ir, r, Gn);
            } else e && Ut.push(e);
          },
          Zt = 255,
          Qt = {
            aqua: [0, Zt, Zt],
            lime: [0, Zt, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Zt],
            navy: [0, 0, 128],
            white: [Zt, Zt, Zt],
            olive: [128, 128, 0],
            yellow: [Zt, Zt, 0],
            orange: [Zt, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Zt, 0, 0],
            pink: [Zt, 192, 203],
            cyan: [0, Zt, Zt],
            transparent: [Zt, Zt, Zt, 0],
          },
          Jt = function (e, t, n) {
            return (
              ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
                ? t + (n - t) * e * 6
                : e < 0.5
                ? n
                : 3 * e < 2
                ? t + (n - t) * (2 / 3 - e) * 6
                : t) *
                Zt +
                0.5) |
              0
            );
          },
          $t = function (e, t, n) {
            var r,
              i,
              a,
              o,
              s,
              l,
              u,
              c,
              d,
              h,
              v = e ? (de(e) ? [e >> 16, (e >> 8) & Zt, e & Zt] : 0) : Qt.black;
            if (!v) {
              if (
                ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Qt[e])
              )
                v = Qt[e];
              else if ("#" === e.charAt(0)) {
                if (
                  (e.length < 6 &&
                    ((r = e.charAt(1)),
                    (i = e.charAt(2)),
                    (a = e.charAt(3)),
                    (e =
                      "#" +
                      r +
                      r +
                      i +
                      i +
                      a +
                      a +
                      (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
                  9 === e.length)
                )
                  return [
                    (v = parseInt(e.substr(1, 6), 16)) >> 16,
                    (v >> 8) & Zt,
                    v & Zt,
                    parseInt(e.substr(7), 16) / 255,
                  ];
                v = [
                  (e = parseInt(e.substr(1), 16)) >> 16,
                  (e >> 8) & Zt,
                  e & Zt,
                ];
              } else if ("hsl" === e.substr(0, 3))
                if (((v = h = e.match(ye)), t)) {
                  if (~e.indexOf("="))
                    return (
                      (v = e.match(be)), n && v.length < 4 && (v[3] = 1), v
                    );
                } else
                  (o = (+v[0] % 360) / 360),
                    (s = +v[1] / 100),
                    (r =
                      2 * (l = +v[2] / 100) -
                      (i = l <= 0.5 ? l * (s + 1) : l + s - l * s)),
                    v.length > 3 && (v[3] *= 1),
                    (v[0] = Jt(o + 1 / 3, r, i)),
                    (v[1] = Jt(o, r, i)),
                    (v[2] = Jt(o - 1 / 3, r, i));
              else v = e.match(ye) || Qt.transparent;
              v = v.map(Number);
            }
            return (
              t &&
                !h &&
                ((r = v[0] / Zt),
                (i = v[1] / Zt),
                (a = v[2] / Zt),
                (l = ((u = Math.max(r, i, a)) + (c = Math.min(r, i, a))) / 2),
                u === c
                  ? (o = s = 0)
                  : ((d = u - c),
                    (s = l > 0.5 ? d / (2 - u - c) : d / (u + c)),
                    (o =
                      u === r
                        ? (i - a) / d + (i < a ? 6 : 0)
                        : u === i
                        ? (a - r) / d + 2
                        : (r - i) / d + 4),
                    (o *= 60)),
                (v[0] = ~~(o + 0.5)),
                (v[1] = ~~(100 * s + 0.5)),
                (v[2] = ~~(100 * l + 0.5))),
              n && v.length < 4 && (v[3] = 1),
              v
            );
          },
          en = function (e) {
            var t = [],
              n = [],
              r = -1;
            return (
              e.split(nn).forEach(function (e) {
                var i = e.match(xe) || [];
                t.push.apply(t, i), n.push((r += i.length + 1));
              }),
              (t.c = n),
              t
            );
          },
          tn = function (e, t, n) {
            var r,
              i,
              a,
              o,
              s = "",
              l = (e + s).match(nn),
              u = t ? "hsla(" : "rgba(",
              c = 0;
            if (!l) return e;
            if (
              ((l = l.map(function (e) {
                return (
                  (e = $t(e, t, 1)) &&
                  u +
                    (t
                      ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3]
                      : e.join(",")) +
                    ")"
                );
              })),
              n && ((a = en(e)), (r = n.c).join(s) !== a.c.join(s)))
            )
              for (
                o = (i = e.replace(nn, "1").split(xe)).length - 1;
                c < o;
                c++
              )
                s +=
                  i[c] +
                  (~r.indexOf(c)
                    ? l.shift() || u + "0,0,0,0)"
                    : (a.length ? a : l.length ? l : n).shift());
            if (!i)
              for (o = (i = e.split(nn)).length - 1; c < o; c++)
                s += i[c] + l[c];
            return s + i[o];
          },
          nn = (function () {
            var e,
              t =
                "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (e in Qt) t += "|" + e + "\\b";
            return new RegExp(t + ")", "gi");
          })(),
          rn = /hsl[a]?\(/,
          an = (function () {
            var e,
              t,
              n,
              r,
              i,
              a,
              o = Date.now,
              s = 500,
              l = 33,
              u = o(),
              c = u,
              d = 1e3 / 240,
              h = d,
              v = [],
              m = function n(m) {
                var p,
                  f,
                  g,
                  _,
                  y = o() - c,
                  b = !0 === m;
                if (
                  (y > s && (u += y - l),
                  ((p = (g = (c += y) - u) - h) > 0 || b) &&
                    ((_ = ++r.frame),
                    (i = g - 1e3 * r.time),
                    (r.time = g /= 1e3),
                    (h += p + (p >= d ? 4 : d - p)),
                    (f = 1)),
                  b || (e = t(n)),
                  f)
                )
                  for (a = 0; a < v.length; a++) v[a](g, i, _, m);
              };
            return (r = {
              time: 0,
              frame: 0,
              tick: function () {
                m(!0);
              },
              deltaRatio: function (e) {
                return i / (1e3 / (e || 60));
              },
              wake: function () {
                G &&
                  (!K &&
                    pe() &&
                    ((j = K = window),
                    (Y = j.document || {}),
                    (Ce.gsap = ir),
                    (j.gsapVersions || (j.gsapVersions = [])).push(ir.version),
                    ke(Ee || j.GreenSockGlobals || (!j.gsap && j) || {}),
                    (n = j.requestAnimationFrame),
                    Ut.forEach(Wt)),
                  e && r.sleep(),
                  (t =
                    n ||
                    function (e) {
                      return setTimeout(e, (h - 1e3 * r.time + 1) | 0);
                    }),
                  (U = 1),
                  m(2));
              },
              sleep: function () {
                (n ? j.cancelAnimationFrame : clearTimeout)(e),
                  (U = 0),
                  (t = Oe);
              },
              lagSmoothing: function (e, t) {
                (s = e || 1 / 0), (l = Math.min(t || 33, s));
              },
              fps: function (e) {
                (d = 1e3 / (e || 240)), (h = 1e3 * r.time + d);
              },
              add: function (e, t, n) {
                var i = t
                  ? function (t, n, a, o) {
                      e(t, n, a, o), r.remove(i);
                    }
                  : e;
                return r.remove(e), v[n ? "unshift" : "push"](i), on(), i;
              },
              remove: function (e, t) {
                ~(t = v.indexOf(e)) && v.splice(t, 1) && a >= t && a--;
              },
              _listeners: v,
            });
          })(),
          on = function () {
            return !U && an.wake();
          },
          sn = {},
          ln = /^[\d.\-M][\d.\-,\s]/,
          un = /["']/g,
          cn = function (e) {
            for (
              var t,
                n,
                r,
                i = {},
                a = e.substr(1, e.length - 3).split(":"),
                o = a[0],
                s = 1,
                l = a.length;
              s < l;
              s++
            )
              (n = a[s]),
                (t = s !== l - 1 ? n.lastIndexOf(",") : n.length),
                (r = n.substr(0, t)),
                (i[o] = isNaN(r) ? r.replace(un, "").trim() : +r),
                (o = n.substr(t + 1).trim());
            return i;
          },
          dn = function (e) {
            return function (t) {
              return 1 - e(1 - t);
            };
          },
          hn = function e(t, n) {
            for (var r, i = t._first; i; )
              i instanceof bn
                ? e(i, n)
                : !i.vars.yoyoEase ||
                  (i._yoyo && i._repeat) ||
                  i._yoyo === n ||
                  (i.timeline
                    ? e(i.timeline, n)
                    : ((r = i._ease),
                      (i._ease = i._yEase),
                      (i._yEase = r),
                      (i._yoyo = n))),
                (i = i._next);
          },
          vn = function (e, t) {
            return (
              (e &&
                (ce(e)
                  ? e
                  : sn[e] ||
                    (function (e) {
                      var t,
                        n,
                        r,
                        i,
                        a = (e + "").split("("),
                        o = sn[a[0]];
                      return o && a.length > 1 && o.config
                        ? o.config.apply(
                            null,
                            ~e.indexOf("{")
                              ? [cn(a[1])]
                              : ((t = e),
                                (n = t.indexOf("(") + 1),
                                (r = t.indexOf(")")),
                                (i = t.indexOf("(", n)),
                                t.substring(
                                  n,
                                  ~i && i < r ? t.indexOf(")", r + 1) : r
                                ))
                                  .split(",")
                                  .map(et)
                          )
                        : sn._CE && ln.test(e)
                        ? sn._CE("", e)
                        : o;
                    })(e))) ||
              t
            );
          },
          mn = function (e, t, n, r) {
            void 0 === n &&
              (n = function (e) {
                return 1 - t(1 - e);
              }),
              void 0 === r &&
                (r = function (e) {
                  return e < 0.5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
                });
            var i,
              a = { easeIn: t, easeOut: n, easeInOut: r };
            return (
              He(e, function (e) {
                for (var t in ((sn[e] = Ce[e] = a),
                (sn[(i = e.toLowerCase())] = n),
                a))
                  sn[
                    i +
                      ("easeIn" === t
                        ? ".in"
                        : "easeOut" === t
                        ? ".out"
                        : ".inOut")
                  ] = sn[e + "." + t] = a[t];
              }),
              a
            );
          },
          pn = function (e) {
            return function (t) {
              return t < 0.5
                ? (1 - e(1 - 2 * t)) / 2
                : 0.5 + e(2 * (t - 0.5)) / 2;
            };
          },
          fn = function e(t, n, r) {
            var i = n >= 1 ? n : 1,
              a = (r || (t ? 0.3 : 0.45)) / (n < 1 ? n : 1),
              o = (a / re) * (Math.asin(1 / i) || 0),
              s = function (e) {
                return 1 === e
                  ? 1
                  : i * Math.pow(2, -10 * e) * le((e - o) * a) + 1;
              },
              l =
                "out" === t
                  ? s
                  : "in" === t
                  ? function (e) {
                      return 1 - s(1 - e);
                    }
                  : pn(s);
            return (
              (a = re / a),
              (l.config = function (n, r) {
                return e(t, n, r);
              }),
              l
            );
          },
          gn = function e(t, n) {
            void 0 === n && (n = 1.70158);
            var r = function (e) {
                return e ? --e * e * ((n + 1) * e + n) + 1 : 0;
              },
              i =
                "out" === t
                  ? r
                  : "in" === t
                  ? function (e) {
                      return 1 - r(1 - e);
                    }
                  : pn(r);
            return (
              (i.config = function (n) {
                return e(t, n);
              }),
              i
            );
          };
        He("Linear,Quad,Cubic,Quart,Quint,Strong", function (e, t) {
          var n = t < 5 ? t + 1 : t;
          mn(
            e + ",Power" + (n - 1),
            t
              ? function (e) {
                  return Math.pow(e, n);
                }
              : function (e) {
                  return e;
                },
            function (e) {
              return 1 - Math.pow(1 - e, n);
            },
            function (e) {
              return e < 0.5
                ? Math.pow(2 * e, n) / 2
                : 1 - Math.pow(2 * (1 - e), n) / 2;
            }
          );
        }),
          (sn.Linear.easeNone = sn.none = sn.Linear.easeIn),
          mn("Elastic", fn("in"), fn("out"), fn()),
          (W = 7.5625),
          (Q = 1 / (Z = 2.75)),
          mn(
            "Bounce",
            function (e) {
              return 1 - J(1 - e);
            },
            (J = function (e) {
              return e < Q
                ? W * e * e
                : e < 0.7272727272727273
                ? W * Math.pow(e - 1.5 / Z, 2) + 0.75
                : e < 0.9090909090909092
                ? W * (e -= 2.25 / Z) * e + 0.9375
                : W * Math.pow(e - 2.625 / Z, 2) + 0.984375;
            })
          ),
          mn("Expo", function (e) {
            return e ? Math.pow(2, 10 * (e - 1)) : 0;
          }),
          mn("Circ", function (e) {
            return -(oe(1 - e * e) - 1);
          }),
          mn("Sine", function (e) {
            return 1 === e ? 1 : 1 - se(e * ie);
          }),
          mn("Back", gn("in"), gn("out"), gn()),
          (sn.SteppedEase = sn.steps = Ce.SteppedEase = {
            config: function (e, t) {
              void 0 === e && (e = 1);
              var n = 1 / e,
                r = e + (t ? 0 : 1),
                i = t ? 1 : 0;
              return function (e) {
                return (((r * At(0, 0.99999999, e)) | 0) + i) * n;
              };
            },
          }),
          (ee.ease = sn["quad.out"]),
          He(
            "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
            function (e) {
              return (Ke += e + "," + e + "Params,");
            }
          );
        var _n = function (e, t) {
            (this.id = ae++),
              (e._gsap = this),
              (this.target = e),
              (this.harness = t),
              (this.get = t ? t.get : Xe),
              (this.set = t ? t.getSetter : In);
          },
          yn = (function () {
            function e(e) {
              (this.vars = e),
                (this._delay = +e.delay || 0),
                (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
                  ((this._rDelay = e.repeatDelay || 0),
                  (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
                (this._ts = 1),
                wt(this, +e.duration, 1, 1),
                (this.data = e.data),
                B && ((this._ctx = B), B.data.push(this)),
                U || an.wake();
            }
            var t = e.prototype;
            return (
              (t.delay = function (e) {
                return e || 0 === e
                  ? (this.parent &&
                      this.parent.smoothChildTiming &&
                      this.startTime(this._start + e - this._delay),
                    (this._delay = e),
                    this)
                  : this._delay;
              }),
              (t.duration = function (e) {
                return arguments.length
                  ? this.totalDuration(
                      this._repeat > 0
                        ? e + (e + this._rDelay) * this._repeat
                        : e
                    )
                  : this.totalDuration() && this._dur;
              }),
              (t.totalDuration = function (e) {
                return arguments.length
                  ? ((this._dirty = 0),
                    wt(
                      this,
                      this._repeat < 0
                        ? e
                        : (e - this._repeat * this._rDelay) / (this._repeat + 1)
                    ))
                  : this._tDur;
              }),
              (t.totalTime = function (e, t) {
                if ((on(), !arguments.length)) return this._tTime;
                var n = this._dp;
                if (n && n.smoothChildTiming && this._ts) {
                  for (
                    gt(this, e), !n._dp || n.parent || _t(n, this);
                    n && n.parent;

                  )
                    n.parent._time !==
                      n._start +
                        (n._ts >= 0
                          ? n._tTime / n._ts
                          : (n.totalDuration() - n._tTime) / -n._ts) &&
                      n.totalTime(n._tTime, !0),
                      (n = n.parent);
                  !this.parent &&
                    this._dp.autoRemoveChildren &&
                    ((this._ts > 0 && e < this._tDur) ||
                      (this._ts < 0 && e > 0) ||
                      (!this._tDur && !e)) &&
                    yt(this._dp, this, this._start - this._delay);
                }
                return (
                  (this._tTime !== e ||
                    (!this._dur && !t) ||
                    (this._initted && Math.abs(this._zTime) === ne) ||
                    (!e && !this._initted && (this.add || this._ptLookup))) &&
                    (this._ts || (this._pTime = e), $e(this, e, t)),
                  this
                );
              }),
              (t.time = function (e, t) {
                return arguments.length
                  ? this.totalTime(
                      Math.min(this.totalDuration(), e + vt(this)) %
                        (this._dur + this._rDelay) || (e ? this._dur : 0),
                      t
                    )
                  : this._time;
              }),
              (t.totalProgress = function (e, t) {
                return arguments.length
                  ? this.totalTime(this.totalDuration() * e, t)
                  : this.totalDuration()
                  ? Math.min(1, this._tTime / this._tDur)
                  : this.ratio;
              }),
              (t.progress = function (e, t) {
                return arguments.length
                  ? this.totalTime(
                      this.duration() *
                        (!this._yoyo || 1 & this.iteration() ? e : 1 - e) +
                        vt(this),
                      t
                    )
                  : this.duration()
                  ? Math.min(1, this._time / this._dur)
                  : this.ratio;
              }),
              (t.iteration = function (e, t) {
                var n = this.duration() + this._rDelay;
                return arguments.length
                  ? this.totalTime(this._time + (e - 1) * n, t)
                  : this._repeat
                  ? mt(this._tTime, n) + 1
                  : 1;
              }),
              (t.timeScale = function (e) {
                if (!arguments.length)
                  return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === e) return this;
                var t =
                  this.parent && this._ts
                    ? pt(this.parent._time, this)
                    : this._tTime;
                return (
                  (this._rts = +e || 0),
                  (this._ts = this._ps || -1e-8 === e ? 0 : this._rts),
                  this.totalTime(At(-Math.abs(this._delay), this._tDur, t), !0),
                  ft(this),
                  (function (e) {
                    for (var t = e.parent; t && t.parent; )
                      (t._dirty = 1), t.totalDuration(), (t = t.parent);
                    return e;
                  })(this)
                );
              }),
              (t.paused = function (e) {
                return arguments.length
                  ? (this._ps !== e &&
                      ((this._ps = e),
                      e
                        ? ((this._pTime =
                            this._tTime ||
                            Math.max(-this._delay, this.rawTime())),
                          (this._ts = this._act = 0))
                        : (on(),
                          (this._ts = this._rts),
                          this.totalTime(
                            this.parent && !this.parent.smoothChildTiming
                              ? this.rawTime()
                              : this._tTime || this._pTime,
                            1 === this.progress() &&
                              Math.abs(this._zTime) !== ne &&
                              (this._tTime -= ne)
                          ))),
                    this)
                  : this._ps;
              }),
              (t.startTime = function (e) {
                if (arguments.length) {
                  this._start = e;
                  var t = this.parent || this._dp;
                  return (
                    t &&
                      (t._sort || !this.parent) &&
                      yt(t, this, e - this._delay),
                    this
                  );
                }
                return this._start;
              }),
              (t.endTime = function (e) {
                return (
                  this._start +
                  (me(e) ? this.totalDuration() : this.duration()) /
                    Math.abs(this._ts || 1)
                );
              }),
              (t.rawTime = function (e) {
                var t = this.parent || this._dp;
                return t
                  ? e &&
                    (!this._ts ||
                      (this._repeat && this._time && this.totalProgress() < 1))
                    ? this._tTime % (this._dur + this._rDelay)
                    : this._ts
                    ? pt(t.rawTime(e), this)
                    : this._tTime
                  : this._tTime;
              }),
              (t.revert = function (e) {
                void 0 === e && (e = Fe);
                var t = N;
                return (
                  (N = e),
                  (this._initted || this._startAt) &&
                    (this.timeline && this.timeline.revert(e),
                    this.totalTime(-0.01, e.suppressEvents)),
                  "nested" !== this.data && !1 !== e.kill && this.kill(),
                  (N = t),
                  this
                );
              }),
              (t.globalTime = function (e) {
                for (var t = this, n = arguments.length ? e : t.rawTime(); t; )
                  (n = t._start + n / (t._ts || 1)), (t = t._dp);
                return !this.parent && this._sat
                  ? this._sat.vars.immediateRender
                    ? -1 / 0
                    : this._sat.globalTime(e)
                  : n;
              }),
              (t.repeat = function (e) {
                return arguments.length
                  ? ((this._repeat = e === 1 / 0 ? -2 : e), Mt(this))
                  : -2 === this._repeat
                  ? 1 / 0
                  : this._repeat;
              }),
              (t.repeatDelay = function (e) {
                if (arguments.length) {
                  var t = this._time;
                  return (this._rDelay = e), Mt(this), t ? this.time(t) : this;
                }
                return this._rDelay;
              }),
              (t.yoyo = function (e) {
                return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
              }),
              (t.seek = function (e, t) {
                return this.totalTime(Et(this, e), me(t));
              }),
              (t.restart = function (e, t) {
                return this.play().totalTime(e ? -this._delay : 0, me(t));
              }),
              (t.play = function (e, t) {
                return (
                  null != e && this.seek(e, t), this.reversed(!1).paused(!1)
                );
              }),
              (t.reverse = function (e, t) {
                return (
                  null != e && this.seek(e || this.totalDuration(), t),
                  this.reversed(!0).paused(!1)
                );
              }),
              (t.pause = function (e, t) {
                return null != e && this.seek(e, t), this.paused(!0);
              }),
              (t.resume = function () {
                return this.paused(!1);
              }),
              (t.reversed = function (e) {
                return arguments.length
                  ? (!!e !== this.reversed() &&
                      this.timeScale(-this._rts || (e ? -1e-8 : 0)),
                    this)
                  : this._rts < 0;
              }),
              (t.invalidate = function () {
                return (
                  (this._initted = this._act = 0), (this._zTime = -1e-8), this
                );
              }),
              (t.isActive = function () {
                var e,
                  t = this.parent || this._dp,
                  n = this._start;
                return !(
                  t &&
                  !(
                    this._ts &&
                    this._initted &&
                    t.isActive() &&
                    (e = t.rawTime(!0)) >= n &&
                    e < this.endTime(!0) - ne
                  )
                );
              }),
              (t.eventCallback = function (e, t, n) {
                var r = this.vars;
                return arguments.length > 1
                  ? (t
                      ? ((r[e] = t),
                        n && (r[e + "Params"] = n),
                        "onUpdate" === e && (this._onUpdate = t))
                      : delete r[e],
                    this)
                  : r[e];
              }),
              (t.then = function (e) {
                var t = this;
                return new Promise(function (n) {
                  var r = ce(e) ? e : tt,
                    i = function () {
                      var e = t.then;
                      (t.then = null),
                        ce(r) &&
                          (r = r(t)) &&
                          (r.then || r === t) &&
                          (t.then = e),
                        n(r),
                        (t.then = e);
                    };
                  (t._initted && 1 === t.totalProgress() && t._ts >= 0) ||
                  (!t._tTime && t._ts < 0)
                    ? i()
                    : (t._prom = i);
                });
              }),
              (t.kill = function () {
                Ht(this);
              }),
              e
            );
          })();
        nt(yn.prototype, {
          _time: 0,
          _start: 0,
          _end: 0,
          _tTime: 0,
          _tDur: 0,
          _dirty: 0,
          _repeat: 0,
          _yoyo: !1,
          parent: null,
          _initted: !1,
          _rDelay: 0,
          _ts: 1,
          _dp: 0,
          ratio: 0,
          _zTime: -1e-8,
          _prom: 0,
          _ps: !1,
          _rts: 1,
        });
        var bn = (function (e) {
          function t(t, n) {
            var r;
            return (
              void 0 === t && (t = {}),
              ((r = e.call(this, t) || this).labels = {}),
              (r.smoothChildTiming = !!t.smoothChildTiming),
              (r.autoRemoveChildren = !!t.autoRemoveChildren),
              (r._sort = me(t.sortChildren)),
              V && yt(t.parent || V, I(r), n),
              t.reversed && r.reverse(),
              t.paused && r.paused(!0),
              t.scrollTrigger && bt(I(r), t.scrollTrigger),
              r
            );
          }
          L(t, e);
          var n = t.prototype;
          return (
            (n.to = function (e, t, n) {
              return kt(0, arguments, this), this;
            }),
            (n.from = function (e, t, n) {
              return kt(1, arguments, this), this;
            }),
            (n.fromTo = function (e, t, n, r) {
              return kt(2, arguments, this), this;
            }),
            (n.set = function (e, t, n) {
              return (
                (t.duration = 0),
                (t.parent = this),
                ot(t).repeatDelay || (t.repeat = 0),
                (t.immediateRender = !!t.immediateRender),
                new qn(e, t, Et(this, n), 1),
                this
              );
            }),
            (n.call = function (e, t, n) {
              return yt(this, qn.delayedCall(0, e, t), n);
            }),
            (n.staggerTo = function (e, t, n, r, i, a, o) {
              return (
                (n.duration = t),
                (n.stagger = n.stagger || r),
                (n.onComplete = a),
                (n.onCompleteParams = o),
                (n.parent = this),
                new qn(e, n, Et(this, i)),
                this
              );
            }),
            (n.staggerFrom = function (e, t, n, r, i, a, o) {
              return (
                (n.runBackwards = 1),
                (ot(n).immediateRender = me(n.immediateRender)),
                this.staggerTo(e, t, n, r, i, a, o)
              );
            }),
            (n.staggerFromTo = function (e, t, n, r, i, a, o, s) {
              return (
                (r.startAt = n),
                (ot(r).immediateRender = me(r.immediateRender)),
                this.staggerTo(e, t, r, i, a, o, s)
              );
            }),
            (n.render = function (e, t, n) {
              var r,
                i,
                a,
                o,
                s,
                l,
                u,
                c,
                d,
                h,
                v,
                m,
                p = this._time,
                f = this._dirty ? this.totalDuration() : this._tDur,
                g = this._dur,
                _ = e <= 0 ? 0 : We(e),
                y = this._zTime < 0 != e < 0 && (this._initted || !g);
              if (
                (this !== V && _ > f && e >= 0 && (_ = f),
                _ !== this._tTime || n || y)
              ) {
                if (
                  (p !== this._time &&
                    g &&
                    ((_ += this._time - p), (e += this._time - p)),
                  (r = _),
                  (d = this._start),
                  (l = !(c = this._ts)),
                  y && (g || (p = this._zTime), (e || !t) && (this._zTime = e)),
                  this._repeat)
                ) {
                  if (
                    ((v = this._yoyo),
                    (s = g + this._rDelay),
                    this._repeat < -1 && e < 0)
                  )
                    return this.totalTime(100 * s + e, t, n);
                  if (
                    ((r = We(_ % s)),
                    _ === f
                      ? ((o = this._repeat), (r = g))
                      : ((o = ~~(_ / s)) && o === _ / s && ((r = g), o--),
                        r > g && (r = g)),
                    (h = mt(this._tTime, s)),
                    !p &&
                      this._tTime &&
                      h !== o &&
                      this._tTime - h * s - this._dur <= 0 &&
                      (h = o),
                    v && 1 & o && ((r = g - r), (m = 1)),
                    o !== h && !this._lock)
                  ) {
                    var b = v && 1 & h,
                      x = b === (v && 1 & o);
                    if (
                      (o < h && (b = !b),
                      (p = b ? 0 : _ % g ? g : _),
                      (this._lock = 1),
                      (this.render(p || (m ? 0 : We(o * s)), t, !g)._lock = 0),
                      (this._tTime = _),
                      !t && this.parent && Xt(this, "onRepeat"),
                      this.vars.repeatRefresh &&
                        !m &&
                        (this.invalidate()._lock = 1),
                      (p && p !== this._time) ||
                        l !== !this._ts ||
                        (this.vars.onRepeat && !this.parent && !this._act))
                    )
                      return this;
                    if (
                      ((g = this._dur),
                      (f = this._tDur),
                      x &&
                        ((this._lock = 2),
                        (p = b ? g : -1e-4),
                        this.render(p, !0),
                        this.vars.repeatRefresh && !m && this.invalidate()),
                      (this._lock = 0),
                      !this._ts && !l)
                    )
                      return this;
                    hn(this, m);
                  }
                }
                if (
                  (this._hasPause &&
                    !this._forcing &&
                    this._lock < 2 &&
                    ((u = (function (e, t, n) {
                      var r;
                      if (n > t)
                        for (r = e._first; r && r._start <= n; ) {
                          if ("isPause" === r.data && r._start > t) return r;
                          r = r._next;
                        }
                      else
                        for (r = e._last; r && r._start >= n; ) {
                          if ("isPause" === r.data && r._start < t) return r;
                          r = r._prev;
                        }
                    })(this, We(p), We(r))),
                    u && (_ -= r - (r = u._start))),
                  (this._tTime = _),
                  (this._time = r),
                  (this._act = !c),
                  this._initted ||
                    ((this._onUpdate = this.vars.onUpdate),
                    (this._initted = 1),
                    (this._zTime = e),
                    (p = 0)),
                  !p &&
                    r &&
                    !t &&
                    !o &&
                    (Xt(this, "onStart"), this._tTime !== _))
                )
                  return this;
                if (r >= p && e >= 0)
                  for (i = this._first; i; ) {
                    if (
                      ((a = i._next),
                      (i._act || r >= i._start) && i._ts && u !== i)
                    ) {
                      if (i.parent !== this) return this.render(e, t, n);
                      if (
                        (i.render(
                          i._ts > 0
                            ? (r - i._start) * i._ts
                            : (i._dirty ? i.totalDuration() : i._tDur) +
                                (r - i._start) * i._ts,
                          t,
                          n
                        ),
                        r !== this._time || (!this._ts && !l))
                      ) {
                        (u = 0), a && (_ += this._zTime = -1e-8);
                        break;
                      }
                    }
                    i = a;
                  }
                else {
                  i = this._last;
                  for (var S = e < 0 ? e : r; i; ) {
                    if (
                      ((a = i._prev),
                      (i._act || S <= i._end) && i._ts && u !== i)
                    ) {
                      if (i.parent !== this) return this.render(e, t, n);
                      if (
                        (i.render(
                          i._ts > 0
                            ? (S - i._start) * i._ts
                            : (i._dirty ? i.totalDuration() : i._tDur) +
                                (S - i._start) * i._ts,
                          t,
                          n || (N && (i._initted || i._startAt))
                        ),
                        r !== this._time || (!this._ts && !l))
                      ) {
                        (u = 0), a && (_ += this._zTime = S ? -1e-8 : ne);
                        break;
                      }
                    }
                    i = a;
                  }
                }
                if (
                  u &&
                  !t &&
                  (this.pause(),
                  (u.render(r >= p ? 0 : -1e-8)._zTime = r >= p ? 1 : -1),
                  this._ts)
                )
                  return (this._start = d), ft(this), this.render(e, t, n);
                this._onUpdate && !t && Xt(this, "onUpdate", !0),
                  ((_ === f && this._tTime >= this.totalDuration()) ||
                    (!_ && p)) &&
                    ((d !== this._start &&
                      Math.abs(c) === Math.abs(this._ts)) ||
                      this._lock ||
                      ((e || !g) &&
                        ((_ === f && this._ts > 0) || (!_ && this._ts < 0)) &&
                        ut(this, 1),
                      t ||
                        (e < 0 && !p) ||
                        (!_ && !p && f) ||
                        (Xt(
                          this,
                          _ === f && e >= 0
                            ? "onComplete"
                            : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(_ < f && this.timeScale() > 0) &&
                          this._prom())));
              }
              return this;
            }),
            (n.add = function (e, t) {
              var n = this;
              if ((de(t) || (t = Et(this, t, e)), !(e instanceof yn))) {
                if (_e(e))
                  return (
                    e.forEach(function (e) {
                      return n.add(e, t);
                    }),
                    this
                  );
                if (ue(e)) return this.addLabel(e, t);
                if (!ce(e)) return this;
                e = qn.delayedCall(0, e);
              }
              return this !== e ? yt(this, e, t) : this;
            }),
            (n.getChildren = function (e, t, n, r) {
              void 0 === e && (e = !0),
                void 0 === t && (t = !0),
                void 0 === n && (n = !0),
                void 0 === r && (r = -te);
              for (var i = [], a = this._first; a; )
                a._start >= r &&
                  (a instanceof qn
                    ? t && i.push(a)
                    : (n && i.push(a),
                      e && i.push.apply(i, a.getChildren(!0, t, n)))),
                  (a = a._next);
              return i;
            }),
            (n.getById = function (e) {
              for (var t = this.getChildren(1, 1, 1), n = t.length; n--; )
                if (t[n].vars.id === e) return t[n];
            }),
            (n.remove = function (e) {
              return ue(e)
                ? this.removeLabel(e)
                : ce(e)
                ? this.killTweensOf(e)
                : (lt(this, e),
                  e === this._recent && (this._recent = this._last),
                  ct(this));
            }),
            (n.totalTime = function (t, n) {
              return arguments.length
                ? ((this._forcing = 1),
                  !this._dp &&
                    this._ts &&
                    (this._start = We(
                      an.time -
                        (this._ts > 0
                          ? t / this._ts
                          : (this.totalDuration() - t) / -this._ts)
                    )),
                  e.prototype.totalTime.call(this, t, n),
                  (this._forcing = 0),
                  this)
                : this._tTime;
            }),
            (n.addLabel = function (e, t) {
              return (this.labels[e] = Et(this, t)), this;
            }),
            (n.removeLabel = function (e) {
              return delete this.labels[e], this;
            }),
            (n.addPause = function (e, t, n) {
              var r = qn.delayedCall(0, t || Oe, n);
              return (
                (r.data = "isPause"),
                (this._hasPause = 1),
                yt(this, r, Et(this, e))
              );
            }),
            (n.removePause = function (e) {
              var t = this._first;
              for (e = Et(this, e); t; )
                t._start === e && "isPause" === t.data && ut(t), (t = t._next);
            }),
            (n.killTweensOf = function (e, t, n) {
              for (var r = this.getTweensOf(e, n), i = r.length; i--; )
                xn !== r[i] && r[i].kill(e, t);
              return this;
            }),
            (n.getTweensOf = function (e, t) {
              for (var n, r = [], i = Ft(e), a = this._first, o = de(t); a; )
                a instanceof qn
                  ? Qe(a._targets, i) &&
                    (o
                      ? (!xn || (a._initted && a._ts)) &&
                        a.globalTime(0) <= t &&
                        a.globalTime(a.totalDuration()) > t
                      : !t || a.isActive()) &&
                    r.push(a)
                  : (n = a.getTweensOf(i, t)).length && r.push.apply(r, n),
                  (a = a._next);
              return r;
            }),
            (n.tweenTo = function (e, t) {
              t = t || {};
              var n,
                r = this,
                i = Et(r, e),
                a = t,
                o = a.startAt,
                s = a.onStart,
                l = a.onStartParams,
                u = a.immediateRender,
                c = qn.to(
                  r,
                  nt(
                    {
                      ease: t.ease || "none",
                      lazy: !1,
                      immediateRender: !1,
                      time: i,
                      overwrite: "auto",
                      duration:
                        t.duration ||
                        Math.abs(
                          (i - (o && "time" in o ? o.time : r._time)) /
                            r.timeScale()
                        ) ||
                        ne,
                      onStart: function () {
                        if ((r.pause(), !n)) {
                          var e =
                            t.duration ||
                            Math.abs(
                              (i - (o && "time" in o ? o.time : r._time)) /
                                r.timeScale()
                            );
                          c._dur !== e &&
                            wt(c, e, 0, 1).render(c._time, !0, !0),
                            (n = 1);
                        }
                        s && s.apply(c, l || []);
                      },
                    },
                    t
                  )
                );
              return u ? c.render(0) : c;
            }),
            (n.tweenFromTo = function (e, t, n) {
              return this.tweenTo(t, nt({ startAt: { time: Et(this, e) } }, n));
            }),
            (n.recent = function () {
              return this._recent;
            }),
            (n.nextLabel = function (e) {
              return void 0 === e && (e = this._time), Gt(this, Et(this, e));
            }),
            (n.previousLabel = function (e) {
              return void 0 === e && (e = this._time), Gt(this, Et(this, e), 1);
            }),
            (n.currentLabel = function (e) {
              return arguments.length
                ? this.seek(e, !0)
                : this.previousLabel(this._time + ne);
            }),
            (n.shiftChildren = function (e, t, n) {
              void 0 === n && (n = 0);
              for (var r, i = this._first, a = this.labels; i; )
                i._start >= n && ((i._start += e), (i._end += e)),
                  (i = i._next);
              if (t) for (r in a) a[r] >= n && (a[r] += e);
              return ct(this);
            }),
            (n.invalidate = function (t) {
              var n = this._first;
              for (this._lock = 0; n; ) n.invalidate(t), (n = n._next);
              return e.prototype.invalidate.call(this, t);
            }),
            (n.clear = function (e) {
              void 0 === e && (e = !0);
              for (var t, n = this._first; n; )
                (t = n._next), this.remove(n), (n = t);
              return (
                this._dp && (this._time = this._tTime = this._pTime = 0),
                e && (this.labels = {}),
                ct(this)
              );
            }),
            (n.totalDuration = function (e) {
              var t,
                n,
                r,
                i = 0,
                a = this,
                o = a._last,
                s = te;
              if (arguments.length)
                return a.timeScale(
                  (a._repeat < 0 ? a.duration() : a.totalDuration()) /
                    (a.reversed() ? -e : e)
                );
              if (a._dirty) {
                for (r = a.parent; o; )
                  (t = o._prev),
                    o._dirty && o.totalDuration(),
                    (n = o._start) > s && a._sort && o._ts && !a._lock
                      ? ((a._lock = 1), (yt(a, o, n - o._delay, 1)._lock = 0))
                      : (s = n),
                    n < 0 &&
                      o._ts &&
                      ((i -= n),
                      ((!r && !a._dp) || (r && r.smoothChildTiming)) &&
                        ((a._start += n / a._ts),
                        (a._time -= n),
                        (a._tTime -= n)),
                      a.shiftChildren(-n, !1, -Infinity),
                      (s = 0)),
                    o._end > i && o._ts && (i = o._end),
                    (o = t);
                wt(a, a === V && a._time > i ? a._time : i, 1, 1),
                  (a._dirty = 0);
              }
              return a._tDur;
            }),
            (t.updateRoot = function (e) {
              if (
                (V._ts && ($e(V, pt(e, V)), (X = an.frame)), an.frame >= Ve)
              ) {
                Ve += $.autoSleep || 120;
                var t = V._first;
                if ((!t || !t._ts) && $.autoSleep && an._listeners.length < 2) {
                  for (; t && !t._ts; ) t = t._next;
                  t || an.sleep();
                }
              }
            }),
            t
          );
        })(yn);
        nt(bn.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
        var xn,
          Sn,
          Tn = function (e, t, n, r, i, a, o) {
            var s,
              l,
              u,
              c,
              d,
              h,
              v,
              m,
              p = new Gn(this._pt, e, t, 0, 1, Nn, null, i),
              f = 0,
              g = 0;
            for (
              p.b = n,
                p.e = r,
                n += "",
                (v = ~(r += "").indexOf("random(")) && (r = Kt(r)),
                a && (a((m = [n, r]), e, t), (n = m[0]), (r = m[1])),
                l = n.match(Se) || [];
              (s = Se.exec(r));

            )
              (c = s[0]),
                (d = r.substring(f, s.index)),
                u ? (u = (u + 1) % 5) : "rgba(" === d.substr(-5) && (u = 1),
                c !== l[g++] &&
                  ((h = parseFloat(l[g - 1]) || 0),
                  (p._pt = {
                    _next: p._pt,
                    p: d || 1 === g ? d : ",",
                    s: h,
                    c: "=" === c.charAt(1) ? Ze(h, c) - h : parseFloat(c) - h,
                    m: u && u < 4 ? Math.round : 0,
                  }),
                  (f = Se.lastIndex));
            return (
              (p.c = f < r.length ? r.substring(f, r.length) : ""),
              (p.fp = o),
              (Te.test(r) || v) && (p.e = 0),
              (this._pt = p),
              p
            );
          },
          wn = function (e, t, n, r, i, a, o, s, l, u) {
            ce(r) && (r = r(i || 0, e, a));
            var c,
              d = e[t],
              h =
                "get" !== n
                  ? n
                  : ce(d)
                  ? l
                    ? e[
                        t.indexOf("set") || !ce(e["get" + t.substr(3)])
                          ? t
                          : "get" + t.substr(3)
                      ](l)
                    : e[t]()
                  : d,
              v = ce(d) ? (l ? Rn : Pn) : On;
            if (
              (ue(r) &&
                (~r.indexOf("random(") && (r = Kt(r)),
                "=" === r.charAt(1) &&
                  ((c = Ze(h, r) + (qt(h) || 0)) || 0 === c) &&
                  (r = c)),
              !u || h !== r || Sn)
            )
              return isNaN(h * r) || "" === r
                ? (!d && !(t in e) && De(t, r),
                  Tn.call(this, e, t, h, r, v, s || $.stringFilter, l))
                : ((c = new Gn(
                    this._pt,
                    e,
                    t,
                    +h || 0,
                    r - (h || 0),
                    "boolean" == typeof d ? zn : Ln,
                    0,
                    v
                  )),
                  l && (c.fp = l),
                  o && c.modifier(o, this, e),
                  (this._pt = c));
          },
          Mn = function (e, t, n, r, i, a) {
            var o, s, l, u;
            if (
              Ne[e] &&
              !1 !==
                (o = new Ne[e]()).init(
                  i,
                  o.rawVars
                    ? t[e]
                    : (function (e, t, n, r, i) {
                        if (
                          (ce(e) && (e = kn(e, i, t, n, r)),
                          !ve(e) || (e.style && e.nodeType) || _e(e) || ge(e))
                        )
                          return ue(e) ? kn(e, i, t, n, r) : e;
                        var a,
                          o = {};
                        for (a in e) o[a] = kn(e[a], i, t, n, r);
                        return o;
                      })(t[e], r, i, a, n),
                  n,
                  r,
                  a
                ) &&
              ((n._pt = s = new Gn(
                n._pt,
                i,
                e,
                0,
                1,
                o.render,
                o,
                0,
                o.priority
              )),
              n !== H)
            )
              for (
                l = n._ptLookup[n._targets.indexOf(i)], u = o._props.length;
                u--;

              )
                l[o._props[u]] = s;
            return o;
          },
          Cn = function e(t, n, r) {
            var i,
              a,
              o,
              s,
              l,
              u,
              c,
              d,
              h,
              v,
              m,
              p,
              f,
              g = t.vars,
              _ = g.ease,
              y = g.startAt,
              b = g.immediateRender,
              x = g.lazy,
              S = g.onUpdate,
              T = g.onUpdateParams,
              w = g.callbackScope,
              M = g.runBackwards,
              C = g.yoyoEase,
              E = g.keyframes,
              k = g.autoRevert,
              D = t._dur,
              A = t._startAt,
              q = t._targets,
              O = t.parent,
              P = O && "nested" === O.data ? O.vars.targets : q,
              R = "auto" === t._overwrite && !z,
              F = t.timeline;
            if (
              (F && (!E || !_) && (_ = "none"),
              (t._ease = vn(_, ee.ease)),
              (t._yEase = C ? dn(vn(!0 === C ? _ : C, ee.ease)) : 0),
              C &&
                t._yoyo &&
                !t._repeat &&
                ((C = t._yEase), (t._yEase = t._ease), (t._ease = C)),
              (t._from = !F && !!g.runBackwards),
              !F || (E && !g.stagger))
            ) {
              if (
                ((p = (d = q[0] ? Ge(q[0]).harness : 0) && g[d.prop]),
                (i = at(g, Ie)),
                A &&
                  (A._zTime < 0 && A.progress(1),
                  n < 0 && M && b && !k
                    ? A.render(-1, !0)
                    : A.revert(M && D ? Re : Pe),
                  (A._lazy = 0)),
                y)
              ) {
                if (
                  (ut(
                    (t._startAt = qn.set(
                      q,
                      nt(
                        {
                          data: "isStart",
                          overwrite: !1,
                          parent: O,
                          immediateRender: !0,
                          lazy: !A && me(x),
                          startAt: null,
                          delay: 0,
                          onUpdate: S,
                          onUpdateParams: T,
                          callbackScope: w,
                          stagger: 0,
                        },
                        y
                      )
                    ))
                  ),
                  (t._startAt._dp = 0),
                  (t._startAt._sat = t),
                  n < 0 && (N || (!b && !k)) && t._startAt.revert(Re),
                  b && D && n <= 0 && r <= 0)
                )
                  return void (n && (t._zTime = n));
              } else if (M && D && !A)
                if (
                  (n && (b = !1),
                  (o = nt(
                    {
                      overwrite: !1,
                      data: "isFromStart",
                      lazy: b && !A && me(x),
                      immediateRender: b,
                      stagger: 0,
                      parent: O,
                    },
                    i
                  )),
                  p && (o[d.prop] = p),
                  ut((t._startAt = qn.set(q, o))),
                  (t._startAt._dp = 0),
                  (t._startAt._sat = t),
                  n < 0 &&
                    (N ? t._startAt.revert(Re) : t._startAt.render(-1, !0)),
                  (t._zTime = n),
                  b)
                ) {
                  if (!n) return;
                } else e(t._startAt, ne, ne);
              for (
                t._pt = t._ptCache = 0, x = (D && me(x)) || (x && !D), a = 0;
                a < q.length;
                a++
              ) {
                if (
                  ((c = (l = q[a])._gsap || Ye(q)[a]._gsap),
                  (t._ptLookup[a] = v = {}),
                  ze[c.id] && Le.length && Je(),
                  (m = P === q ? a : P.indexOf(l)),
                  d &&
                    !1 !== (h = new d()).init(l, p || i, t, m, P) &&
                    ((t._pt = s = new Gn(
                      t._pt,
                      l,
                      h.name,
                      0,
                      1,
                      h.render,
                      h,
                      0,
                      h.priority
                    )),
                    h._props.forEach(function (e) {
                      v[e] = s;
                    }),
                    h.priority && (u = 1)),
                  !d || p)
                )
                  for (o in i)
                    Ne[o] && (h = Mn(o, i, t, m, l, P))
                      ? h.priority && (u = 1)
                      : (v[o] = s = wn.call(
                          t,
                          l,
                          o,
                          "get",
                          i[o],
                          m,
                          P,
                          0,
                          g.stringFilter
                        ));
                t._op && t._op[a] && t.kill(l, t._op[a]),
                  R &&
                    t._pt &&
                    ((xn = t),
                    V.killTweensOf(l, v, t.globalTime(n)),
                    (f = !t.parent),
                    (xn = 0)),
                  t._pt && x && (ze[c.id] = 1);
              }
              u && Yn(t), t._onInit && t._onInit(t);
            }
            (t._onUpdate = S),
              (t._initted = (!t._op || t._pt) && !f),
              E && n <= 0 && F.render(te, !0, !0);
          },
          En = function (e, t, n, r) {
            var i,
              a,
              o = t.ease || r || "power1.inOut";
            if (_e(t))
              (a = n[e] || (n[e] = [])),
                t.forEach(function (e, n) {
                  return a.push({ t: (n / (t.length - 1)) * 100, v: e, e: o });
                });
            else
              for (i in t)
                (a = n[i] || (n[i] = [])),
                  "ease" === i || a.push({ t: parseFloat(e), v: t[i], e: o });
          },
          kn = function (e, t, n, r, i) {
            return ce(e)
              ? e.call(t, n, r, i)
              : ue(e) && ~e.indexOf("random(")
              ? Kt(e)
              : e;
          },
          Dn = Ke + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
          An = {};
        He(Dn + ",id,stagger,delay,duration,paused,scrollTrigger", function (
          e
        ) {
          return (An[e] = 1);
        });
        var qn = (function (e) {
          function t(t, n, r, i) {
            var a;
            "number" == typeof n && ((r.duration = n), (n = r), (r = null));
            var o,
              s,
              l,
              u,
              c,
              d,
              h,
              v,
              m = (a = e.call(this, i ? n : ot(n)) || this).vars,
              p = m.duration,
              f = m.delay,
              g = m.immediateRender,
              _ = m.stagger,
              y = m.overwrite,
              b = m.keyframes,
              x = m.defaults,
              S = m.scrollTrigger,
              T = m.yoyoEase,
              w = n.parent || V,
              M = (_e(t) || ge(t) ? de(t[0]) : "length" in n) ? [t] : Ft(t);
            if (
              ((a._targets = M.length
                ? Ye(M)
                : Ae(
                    "GSAP target " + t + " not found. https://greensock.com",
                    !$.nullTargetWarn
                  ) || []),
              (a._ptLookup = []),
              (a._overwrite = y),
              b || _ || fe(p) || fe(f))
            ) {
              if (
                ((n = a.vars),
                (o = a.timeline = new bn({
                  data: "nested",
                  defaults: x || {},
                  targets: w && "nested" === w.data ? w.vars.targets : M,
                })).kill(),
                (o.parent = o._dp = I(a)),
                (o._start = 0),
                _ || fe(p) || fe(f))
              ) {
                if (((u = M.length), (h = _ && zt(_)), ve(_)))
                  for (c in _) ~Dn.indexOf(c) && (v || (v = {}), (v[c] = _[c]));
                for (s = 0; s < u; s++)
                  ((l = at(n, An)).stagger = 0),
                    T && (l.yoyoEase = T),
                    v && rt(l, v),
                    (d = M[s]),
                    (l.duration = +kn(p, I(a), s, d, M)),
                    (l.delay = (+kn(f, I(a), s, d, M) || 0) - a._delay),
                    !_ &&
                      1 === u &&
                      l.delay &&
                      ((a._delay = f = l.delay),
                      (a._start += f),
                      (l.delay = 0)),
                    o.to(d, l, h ? h(s, d, M) : 0),
                    (o._ease = sn.none);
                o.duration() ? (p = f = 0) : (a.timeline = 0);
              } else if (b) {
                ot(nt(o.vars.defaults, { ease: "none" })),
                  (o._ease = vn(b.ease || n.ease || "none"));
                var C,
                  E,
                  k,
                  D = 0;
                if (_e(b))
                  b.forEach(function (e) {
                    return o.to(M, e, ">");
                  }),
                    o.duration();
                else {
                  for (c in ((l = {}), b))
                    "ease" === c ||
                      "easeEach" === c ||
                      En(c, b[c], l, b.easeEach);
                  for (c in l)
                    for (
                      C = l[c].sort(function (e, t) {
                        return e.t - t.t;
                      }),
                        D = 0,
                        s = 0;
                      s < C.length;
                      s++
                    )
                      ((k = {
                        ease: (E = C[s]).e,
                        duration: ((E.t - (s ? C[s - 1].t : 0)) / 100) * p,
                      })[c] = E.v),
                        o.to(M, k, D),
                        (D += k.duration);
                  o.duration() < p && o.to({}, { duration: p - o.duration() });
                }
              }
              p || a.duration((p = o.duration()));
            } else a.timeline = 0;
            return (
              !0 !== y || z || ((xn = I(a)), V.killTweensOf(M), (xn = 0)),
              yt(w, I(a), r),
              n.reversed && a.reverse(),
              n.paused && a.paused(!0),
              (g ||
                (!p &&
                  !b &&
                  a._start === We(w._time) &&
                  me(g) &&
                  ht(I(a)) &&
                  "nested" !== w.data)) &&
                ((a._tTime = -1e-8), a.render(Math.max(0, -f) || 0)),
              S && bt(I(a), S),
              a
            );
          }
          L(t, e);
          var n = t.prototype;
          return (
            (n.render = function (e, t, n) {
              var r,
                i,
                a,
                o,
                s,
                l,
                u,
                c,
                d,
                h = this._time,
                v = this._tDur,
                m = this._dur,
                p = e < 0,
                f = e > v - ne && !p ? v : e < ne ? 0 : e;
              if (m) {
                if (
                  f !== this._tTime ||
                  !e ||
                  n ||
                  (!this._initted && this._tTime) ||
                  (this._startAt && this._zTime < 0 !== p)
                ) {
                  if (((r = f), (c = this.timeline), this._repeat)) {
                    if (((o = m + this._rDelay), this._repeat < -1 && p))
                      return this.totalTime(100 * o + e, t, n);
                    if (
                      ((r = We(f % o)),
                      f === v
                        ? ((a = this._repeat), (r = m))
                        : ((a = ~~(f / o)) && a === f / o && ((r = m), a--),
                          r > m && (r = m)),
                      (l = this._yoyo && 1 & a) &&
                        ((d = this._yEase), (r = m - r)),
                      (s = mt(this._tTime, o)),
                      r === h && !n && this._initted)
                    )
                      return (this._tTime = f), this;
                    a !== s &&
                      (c && this._yEase && hn(c, l),
                      !this.vars.repeatRefresh ||
                        l ||
                        this._lock ||
                        ((this._lock = n = 1),
                        (this.render(We(o * a), !0).invalidate()._lock = 0)));
                  }
                  if (!this._initted) {
                    if (xt(this, p ? e : r, n, t, f))
                      return (this._tTime = 0), this;
                    if (h !== this._time) return this;
                    if (m !== this._dur) return this.render(e, t, n);
                  }
                  if (
                    ((this._tTime = f),
                    (this._time = r),
                    !this._act &&
                      this._ts &&
                      ((this._act = 1), (this._lazy = 0)),
                    (this.ratio = u = (d || this._ease)(r / m)),
                    this._from && (this.ratio = u = 1 - u),
                    r &&
                      !h &&
                      !t &&
                      !a &&
                      (Xt(this, "onStart"), this._tTime !== f))
                  )
                    return this;
                  for (i = this._pt; i; ) i.r(u, i.d), (i = i._next);
                  (c &&
                    c.render(
                      e < 0
                        ? e
                        : !r && l
                        ? -1e-8
                        : c._dur * c._ease(r / this._dur),
                      t,
                      n
                    )) ||
                    (this._startAt && (this._zTime = e)),
                    this._onUpdate &&
                      !t &&
                      (p && dt(this, e, 0, n), Xt(this, "onUpdate")),
                    this._repeat &&
                      a !== s &&
                      this.vars.onRepeat &&
                      !t &&
                      this.parent &&
                      Xt(this, "onRepeat"),
                    (f !== this._tDur && f) ||
                      this._tTime !== f ||
                      (p && !this._onUpdate && dt(this, e, 0, !0),
                      (e || !m) &&
                        ((f === this._tDur && this._ts > 0) ||
                          (!f && this._ts < 0)) &&
                        ut(this, 1),
                      t ||
                        (p && !h) ||
                        !(f || h || l) ||
                        (Xt(
                          this,
                          f === v ? "onComplete" : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(f < v && this.timeScale() > 0) &&
                          this._prom()));
                }
              } else
                !(function (e, t, n, r) {
                  var i,
                    a,
                    o,
                    s = e.ratio,
                    l =
                      t < 0 ||
                      (!t &&
                        ((!e._start && St(e) && (e._initted || !Tt(e))) ||
                          ((e._ts < 0 || e._dp._ts < 0) && !Tt(e))))
                        ? 0
                        : 1,
                    u = e._rDelay,
                    c = 0;
                  if (
                    (u &&
                      e._repeat &&
                      ((c = At(0, e._tDur, t)),
                      (a = mt(c, u)),
                      e._yoyo && 1 & a && (l = 1 - l),
                      a !== mt(e._tTime, u) &&
                        ((s = 1 - l),
                        e.vars.repeatRefresh && e._initted && e.invalidate())),
                    l !== s || N || r || e._zTime === ne || (!t && e._zTime))
                  ) {
                    if (!e._initted && xt(e, t, r, n, c)) return;
                    for (
                      o = e._zTime,
                        e._zTime = t || (n ? ne : 0),
                        n || (n = t && !o),
                        e.ratio = l,
                        e._from && (l = 1 - l),
                        e._time = 0,
                        e._tTime = c,
                        i = e._pt;
                      i;

                    )
                      i.r(l, i.d), (i = i._next);
                    t < 0 && dt(e, t, 0, !0),
                      e._onUpdate && !n && Xt(e, "onUpdate"),
                      c && e._repeat && !n && e.parent && Xt(e, "onRepeat"),
                      (t >= e._tDur || t < 0) &&
                        e.ratio === l &&
                        (l && ut(e, 1),
                        n ||
                          N ||
                          (Xt(e, l ? "onComplete" : "onReverseComplete", !0),
                          e._prom && e._prom()));
                  } else e._zTime || (e._zTime = t);
                })(this, e, t, n);
              return this;
            }),
            (n.targets = function () {
              return this._targets;
            }),
            (n.invalidate = function (t) {
              return (
                (!t || !this.vars.runBackwards) && (this._startAt = 0),
                (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
                (this._ptLookup = []),
                this.timeline && this.timeline.invalidate(t),
                e.prototype.invalidate.call(this, t)
              );
            }),
            (n.resetTo = function (e, t, n, r) {
              U || an.wake(), this._ts || this.play();
              var i = Math.min(
                this._dur,
                (this._dp._time - this._start) * this._ts
              );
              return (
                this._initted || Cn(this, i),
                (function (e, t, n, r, i, a, o) {
                  var s,
                    l,
                    u,
                    c,
                    d = ((e._pt && e._ptCache) || (e._ptCache = {}))[t];
                  if (!d)
                    for (
                      d = e._ptCache[t] = [],
                        u = e._ptLookup,
                        c = e._targets.length;
                      c--;

                    ) {
                      if ((s = u[c][t]) && s.d && s.d._pt)
                        for (s = s.d._pt; s && s.p !== t && s.fp !== t; )
                          s = s._next;
                      if (!s)
                        return (
                          (Sn = 1), (e.vars[t] = "+=0"), Cn(e, o), (Sn = 0), 1
                        );
                      d.push(s);
                    }
                  for (c = d.length; c--; )
                    ((s = (l = d[c])._pt || l).s =
                      (!r && 0 !== r) || i ? s.s + (r || 0) + a * s.c : r),
                      (s.c = n - s.s),
                      l.e && (l.e = Ue(n) + qt(l.e)),
                      l.b && (l.b = s.s + qt(l.b));
                })(this, e, t, n, r, this._ease(i / this._dur), i)
                  ? this.resetTo(e, t, n, r)
                  : (gt(this, 0),
                    this.parent ||
                      st(
                        this._dp,
                        this,
                        "_first",
                        "_last",
                        this._dp._sort ? "_start" : 0
                      ),
                    this.render(0))
              );
            }),
            (n.kill = function (e, t) {
              if ((void 0 === t && (t = "all"), !(e || (t && "all" !== t))))
                return (
                  (this._lazy = this._pt = 0), this.parent ? Ht(this) : this
                );
              if (this.timeline) {
                var n = this.timeline.totalDuration();
                return (
                  this.timeline.killTweensOf(
                    e,
                    t,
                    xn && !0 !== xn.vars.overwrite
                  )._first || Ht(this),
                  this.parent &&
                    n !== this.timeline.totalDuration() &&
                    wt(this, (this._dur * this.timeline._tDur) / n, 0, 1),
                  this
                );
              }
              var r,
                i,
                a,
                o,
                s,
                l,
                u,
                c = this._targets,
                d = e ? Ft(e) : c,
                h = this._ptLookup,
                v = this._pt;
              if (
                (!t || "all" === t) &&
                (function (e, t) {
                  for (
                    var n = e.length, r = n === t.length;
                    r && n-- && e[n] === t[n];

                  );
                  return n < 0;
                })(c, d)
              )
                return "all" === t && (this._pt = 0), Ht(this);
              for (
                r = this._op = this._op || [],
                  "all" !== t &&
                    (ue(t) &&
                      ((s = {}),
                      He(t, function (e) {
                        return (s[e] = 1);
                      }),
                      (t = s)),
                    (t = (function (e, t) {
                      var n,
                        r,
                        i,
                        a,
                        o = e[0] ? Ge(e[0]).harness : 0,
                        s = o && o.aliases;
                      if (!s) return t;
                      for (r in ((n = rt({}, t)), s))
                        if ((r in n))
                          for (i = (a = s[r].split(",")).length; i--; )
                            n[a[i]] = n[r];
                      return n;
                    })(c, t))),
                  u = c.length;
                u--;

              )
                if (~d.indexOf(c[u]))
                  for (s in ((i = h[u]),
                  "all" === t
                    ? ((r[u] = t), (o = i), (a = {}))
                    : ((a = r[u] = r[u] || {}), (o = t)),
                  o))
                    (l = i && i[s]) &&
                      (("kill" in l.d && !0 !== l.d.kill(s)) ||
                        lt(this, l, "_pt"),
                      delete i[s]),
                      "all" !== a && (a[s] = 1);
              return this._initted && !this._pt && v && Ht(this), this;
            }),
            (t.to = function (e, n) {
              return new t(e, n, arguments[2]);
            }),
            (t.from = function (e, t) {
              return kt(1, arguments);
            }),
            (t.delayedCall = function (e, n, r, i) {
              return new t(n, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: e,
                onComplete: n,
                onReverseComplete: n,
                onCompleteParams: r,
                onReverseCompleteParams: r,
                callbackScope: i,
              });
            }),
            (t.fromTo = function (e, t, n) {
              return kt(2, arguments);
            }),
            (t.set = function (e, n) {
              return (
                (n.duration = 0), n.repeatDelay || (n.repeat = 0), new t(e, n)
              );
            }),
            (t.killTweensOf = function (e, t, n) {
              return V.killTweensOf(e, t, n);
            }),
            t
          );
        })(yn);
        nt(qn.prototype, {
          _targets: [],
          _lazy: 0,
          _startAt: 0,
          _op: 0,
          _onInit: 0,
        }),
          He("staggerTo,staggerFrom,staggerFromTo", function (e) {
            qn[e] = function () {
              var t = new bn(),
                n = Ot.call(arguments, 0);
              return (
                n.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, n)
              );
            };
          });
        var On = function (e, t, n) {
            return (e[t] = n);
          },
          Pn = function (e, t, n) {
            return e[t](n);
          },
          Rn = function (e, t, n, r) {
            return e[t](r.fp, n);
          },
          Fn = function (e, t, n) {
            return e.setAttribute(t, n);
          },
          In = function (e, t) {
            return ce(e[t]) ? Pn : he(e[t]) && e.setAttribute ? Fn : On;
          },
          Ln = function (e, t) {
            return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
          },
          zn = function (e, t) {
            return t.set(t.t, t.p, !!(t.s + t.c * e), t);
          },
          Nn = function (e, t) {
            var n = t._pt,
              r = "";
            if (!e && t.b) r = t.b;
            else if (1 === e && t.e) r = t.e;
            else {
              for (; n; )
                (r =
                  n.p +
                  (n.m
                    ? n.m(n.s + n.c * e)
                    : Math.round(1e4 * (n.s + n.c * e)) / 1e4) +
                  r),
                  (n = n._next);
              r += t.c;
            }
            t.set(t.t, t.p, r, t);
          },
          Bn = function (e, t) {
            for (var n = t._pt; n; ) n.r(e, n.d), (n = n._next);
          },
          Vn = function (e, t, n, r) {
            for (var i, a = this._pt; a; )
              (i = a._next), a.p === r && a.modifier(e, t, n), (a = i);
          },
          jn = function (e) {
            for (var t, n, r = this._pt; r; )
              (n = r._next),
                (r.p === e && !r.op) || r.op === e
                  ? lt(this, r, "_pt")
                  : r.dep || (t = 1),
                (r = n);
            return !t;
          },
          Kn = function (e, t, n, r) {
            r.mSet(e, t, r.m.call(r.tween, n, r.mt), r);
          },
          Yn = function (e) {
            for (var t, n, r, i, a = e._pt; a; ) {
              for (t = a._next, n = r; n && n.pr > a.pr; ) n = n._next;
              (a._prev = n ? n._prev : i) ? (a._prev._next = a) : (r = a),
                (a._next = n) ? (n._prev = a) : (i = a),
                (a = t);
            }
            e._pt = r;
          },
          Gn = (function () {
            function e(e, t, n, r, i, a, o, s, l) {
              (this.t = t),
                (this.s = r),
                (this.c = i),
                (this.p = n),
                (this.r = a || Ln),
                (this.d = o || this),
                (this.set = s || On),
                (this.pr = l || 0),
                (this._next = e),
                e && (e._prev = this);
            }
            return (
              (e.prototype.modifier = function (e, t, n) {
                (this.mSet = this.mSet || this.set),
                  (this.set = Kn),
                  (this.m = e),
                  (this.mt = n),
                  (this.tween = t);
              }),
              e
            );
          })();
        He(
          Ke +
            "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
          function (e) {
            return (Ie[e] = 1);
          }
        ),
          (Ce.TweenMax = Ce.TweenLite = qn),
          (Ce.TimelineLite = Ce.TimelineMax = bn),
          (V = new bn({
            sortChildren: !1,
            defaults: ee,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0,
          })),
          ($.stringFilter = function (e) {
            var t,
              n = e.join(" ");
            if (((nn.lastIndex = 0), nn.test(n)))
              return (
                (t = rn.test(n)),
                (e[1] = tn(e[1], t)),
                (e[0] = tn(e[0], t, en(e[1]))),
                !0
              );
          });
        var Xn = [],
          Hn = {},
          Un = [],
          Wn = 0,
          Zn = 0,
          Qn = function (e) {
            return (Hn[e] || Un).map(function (e) {
              return e();
            });
          },
          Jn = function () {
            var e = Date.now(),
              t = [];
            e - Wn > 2 &&
              (Qn("matchMediaInit"),
              Xn.forEach(function (e) {
                var n,
                  r,
                  i,
                  a,
                  o = e.queries,
                  s = e.conditions;
                for (r in o)
                  (n = j.matchMedia(o[r]).matches) && (i = 1),
                    n !== s[r] && ((s[r] = n), (a = 1));
                a && (e.revert(), i && t.push(e));
              }),
              Qn("matchMediaRevert"),
              t.forEach(function (e) {
                return e.onMatch(e);
              }),
              (Wn = e),
              Qn("matchMedia"));
          },
          $n = (function () {
            function e(e, t) {
              (this.selector = t && It(t)),
                (this.data = []),
                (this._r = []),
                (this.isReverted = !1),
                (this.id = Zn++),
                e && this.add(e);
            }
            var t = e.prototype;
            return (
              (t.add = function (e, t, n) {
                ce(e) && ((n = t), (t = e), (e = ce));
                var r = this,
                  i = function () {
                    var e,
                      i = B,
                      a = r.selector;
                    return (
                      i && i !== r && i.data.push(r),
                      n && (r.selector = It(n)),
                      (B = r),
                      (e = t.apply(r, arguments)),
                      ce(e) && r._r.push(e),
                      (B = i),
                      (r.selector = a),
                      (r.isReverted = !1),
                      e
                    );
                  };
                return (r.last = i), e === ce ? i(r) : e ? (r[e] = i) : i;
              }),
              (t.ignore = function (e) {
                var t = B;
                (B = null), e(this), (B = t);
              }),
              (t.getTweens = function () {
                var t = [];
                return (
                  this.data.forEach(function (n) {
                    return n instanceof e
                      ? t.push.apply(t, n.getTweens())
                      : n instanceof qn &&
                          !(n.parent && "nested" === n.parent.data) &&
                          t.push(n);
                  }),
                  t
                );
              }),
              (t.clear = function () {
                this._r.length = this.data.length = 0;
              }),
              (t.kill = function (e, t) {
                var n = this;
                if (e) {
                  var r = this.getTweens();
                  this.data.forEach(function (e) {
                    "isFlip" === e.data &&
                      (e.revert(),
                      e.getChildren(!0, !0, !1).forEach(function (e) {
                        return r.splice(r.indexOf(e), 1);
                      }));
                  }),
                    r
                      .map(function (e) {
                        return { g: e.globalTime(0), t: e };
                      })
                      .sort(function (e, t) {
                        return t.g - e.g || -1 / 0;
                      })
                      .forEach(function (t) {
                        return t.t.revert(e);
                      }),
                    this.data.forEach(function (t) {
                      return !(t instanceof qn) && t.revert && t.revert(e);
                    }),
                    this._r.forEach(function (t) {
                      return t(e, n);
                    }),
                    (this.isReverted = !0);
                } else
                  this.data.forEach(function (e) {
                    return e.kill && e.kill();
                  });
                if ((this.clear(), t))
                  for (var i = Xn.length; i--; )
                    Xn[i].id === this.id && Xn.splice(i, 1);
              }),
              (t.revert = function (e) {
                this.kill(e || {});
              }),
              e
            );
          })(),
          er = (function () {
            function e(e) {
              (this.contexts = []), (this.scope = e);
            }
            var t = e.prototype;
            return (
              (t.add = function (e, t, n) {
                ve(e) || (e = { matches: e });
                var r,
                  i,
                  a,
                  o = new $n(0, n || this.scope),
                  s = (o.conditions = {});
                for (i in (B && !o.selector && (o.selector = B.selector),
                this.contexts.push(o),
                (t = o.add("onMatch", t)),
                (o.queries = e),
                e))
                  "all" === i
                    ? (a = 1)
                    : (r = j.matchMedia(e[i])) &&
                      (Xn.indexOf(o) < 0 && Xn.push(o),
                      (s[i] = r.matches) && (a = 1),
                      r.addListener
                        ? r.addListener(Jn)
                        : r.addEventListener("change", Jn));
                return a && t(o), this;
              }),
              (t.revert = function (e) {
                this.kill(e || {});
              }),
              (t.kill = function (e) {
                this.contexts.forEach(function (t) {
                  return t.kill(e, !0);
                });
              }),
              e
            );
          })(),
          tr = {
            registerPlugin: function () {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                n < e;
                n++
              )
                t[n] = arguments[n];
              t.forEach(function (e) {
                return Wt(e);
              });
            },
            timeline: function (e) {
              return new bn(e);
            },
            getTweensOf: function (e, t) {
              return V.getTweensOf(e, t);
            },
            getProperty: function (e, t, n, r) {
              ue(e) && (e = Ft(e)[0]);
              var i = Ge(e || {}).get,
                a = n ? tt : et;
              return (
                "native" === n && (n = ""),
                e
                  ? t
                    ? a(((Ne[t] && Ne[t].get) || i)(e, t, n, r))
                    : function (t, n, r) {
                        return a(((Ne[t] && Ne[t].get) || i)(e, t, n, r));
                      }
                  : e
              );
            },
            quickSetter: function (e, t, n) {
              if ((e = Ft(e)).length > 1) {
                var r = e.map(function (e) {
                    return ir.quickSetter(e, t, n);
                  }),
                  i = r.length;
                return function (e) {
                  for (var t = i; t--; ) r[t](e);
                };
              }
              e = e[0] || {};
              var a = Ne[t],
                o = Ge(e),
                s = (o.harness && (o.harness.aliases || {})[t]) || t,
                l = a
                  ? function (t) {
                      var r = new a();
                      (H._pt = 0),
                        r.init(e, n ? t + n : t, H, 0, [e]),
                        r.render(1, r),
                        H._pt && Bn(1, H);
                    }
                  : o.set(e, s);
              return a
                ? l
                : function (t) {
                    return l(e, s, n ? t + n : t, o, 1);
                  };
            },
            quickTo: function (e, t, n) {
              var r,
                i = ir.to(
                  e,
                  rt((((r = {})[t] = "+=0.1"), (r.paused = !0), r), n || {})
                ),
                a = function (e, n, r) {
                  return i.resetTo(t, e, n, r);
                };
              return (a.tween = i), a;
            },
            isTweening: function (e) {
              return V.getTweensOf(e, !0).length > 0;
            },
            defaults: function (e) {
              return (
                e && e.ease && (e.ease = vn(e.ease, ee.ease)), it(ee, e || {})
              );
            },
            config: function (e) {
              return it($, e || {});
            },
            registerEffect: function (e) {
              var t = e.name,
                n = e.effect,
                r = e.plugins,
                i = e.defaults,
                a = e.extendTimeline;
              (r || "").split(",").forEach(function (e) {
                return (
                  e &&
                  !Ne[e] &&
                  !Ce[e] &&
                  Ae(t + " effect requires " + e + " plugin.")
                );
              }),
                (Be[t] = function (e, t, r) {
                  return n(Ft(e), nt(t || {}, i), r);
                }),
                a &&
                  (bn.prototype[t] = function (e, n, r) {
                    return this.add(
                      Be[t](e, ve(n) ? n : (r = n) && {}, this),
                      r
                    );
                  });
            },
            registerEase: function (e, t) {
              sn[e] = vn(t);
            },
            parseEase: function (e, t) {
              return arguments.length ? vn(e, t) : sn;
            },
            getById: function (e) {
              return V.getById(e);
            },
            exportRoot: function (e, t) {
              void 0 === e && (e = {});
              var n,
                r,
                i = new bn(e);
              for (
                i.smoothChildTiming = me(e.smoothChildTiming),
                  V.remove(i),
                  i._dp = 0,
                  i._time = i._tTime = V._time,
                  n = V._first;
                n;

              )
                (r = n._next),
                  (!t &&
                    !n._dur &&
                    n instanceof qn &&
                    n.vars.onComplete === n._targets[0]) ||
                    yt(i, n, n._start - n._delay),
                  (n = r);
              return yt(V, i, 0), i;
            },
            context: function (e, t) {
              return e ? new $n(e, t) : B;
            },
            matchMedia: function (e) {
              return new er(e);
            },
            matchMediaRefresh: function () {
              return (
                Xn.forEach(function (e) {
                  var t,
                    n,
                    r = e.conditions;
                  for (n in r) r[n] && ((r[n] = !1), (t = 1));
                  t && e.revert();
                }) || Jn()
              );
            },
            addEventListener: function (e, t) {
              var n = Hn[e] || (Hn[e] = []);
              ~n.indexOf(t) || n.push(t);
            },
            removeEventListener: function (e, t) {
              var n = Hn[e],
                r = n && n.indexOf(t);
              r >= 0 && n.splice(r, 1);
            },
            utils: {
              wrap: function e(t, n, r) {
                var i = n - t;
                return _e(t)
                  ? jt(t, e(0, t.length), n)
                  : Dt(r, function (e) {
                      return ((i + ((e - t) % i)) % i) + t;
                    });
              },
              wrapYoyo: function e(t, n, r) {
                var i = n - t,
                  a = 2 * i;
                return _e(t)
                  ? jt(t, e(0, t.length - 1), n)
                  : Dt(r, function (e) {
                      return (
                        t + ((e = (a + ((e - t) % a)) % a || 0) > i ? a - e : e)
                      );
                    });
              },
              distribute: zt,
              random: Vt,
              snap: Bt,
              normalize: function (e, t, n) {
                return Yt(e, t, 0, 1, n);
              },
              getUnit: qt,
              clamp: function (e, t, n) {
                return Dt(n, function (n) {
                  return At(e, t, n);
                });
              },
              splitColor: $t,
              toArray: Ft,
              selector: It,
              mapRange: Yt,
              pipe: function () {
                for (
                  var e = arguments.length, t = new Array(e), n = 0;
                  n < e;
                  n++
                )
                  t[n] = arguments[n];
                return function (e) {
                  return t.reduce(function (e, t) {
                    return t(e);
                  }, e);
                };
              },
              unitize: function (e, t) {
                return function (n) {
                  return e(parseFloat(n)) + (t || qt(n));
                };
              },
              interpolate: function e(t, n, r, i) {
                var a = isNaN(t + n)
                  ? 0
                  : function (e) {
                      return (1 - e) * t + e * n;
                    };
                if (!a) {
                  var o,
                    s,
                    l,
                    u,
                    c,
                    d = ue(t),
                    h = {};
                  if ((!0 === r && (i = 1) && (r = null), d))
                    (t = { p: t }), (n = { p: n });
                  else if (_e(t) && !_e(n)) {
                    for (l = [], u = t.length, c = u - 2, s = 1; s < u; s++)
                      l.push(e(t[s - 1], t[s]));
                    u--,
                      (a = function (e) {
                        e *= u;
                        var t = Math.min(c, ~~e);
                        return l[t](e - t);
                      }),
                      (r = n);
                  } else i || (t = rt(_e(t) ? [] : {}, t));
                  if (!l) {
                    for (o in n) wn.call(h, t, o, "get", n[o]);
                    a = function (e) {
                      return Bn(e, h) || (d ? t.p : t);
                    };
                  }
                }
                return Dt(r, a);
              },
              shuffle: Lt,
            },
            install: ke,
            effects: Be,
            ticker: an,
            updateRoot: bn.updateRoot,
            plugins: Ne,
            globalTimeline: V,
            core: {
              PropTween: Gn,
              globals: qe,
              Tween: qn,
              Timeline: bn,
              Animation: yn,
              getCache: Ge,
              _removeLinkedListItem: lt,
              reverting: function () {
                return N;
              },
              context: function (e) {
                return e && B && (B.data.push(e), (e._ctx = B)), B;
              },
              suppressOverwrites: function (e) {
                return (z = e);
              },
            },
          };
        He("to,from,fromTo,delayedCall,set,killTweensOf", function (e) {
          return (tr[e] = qn[e]);
        }),
          an.add(bn.updateRoot),
          (H = tr.to({}, { duration: 0 }));
        var nr = function (e, t) {
            for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
              n = n._next;
            return n;
          },
          rr = function (e, t) {
            return {
              name: e,
              rawVars: 1,
              init: function (e, n, r) {
                r._onInit = function (e) {
                  var r, i;
                  if (
                    (ue(n) &&
                      ((r = {}),
                      He(n, function (e) {
                        return (r[e] = 1);
                      }),
                      (n = r)),
                    t)
                  ) {
                    for (i in ((r = {}), n)) r[i] = t(n[i]);
                    n = r;
                  }
                  !(function (e, t) {
                    var n,
                      r,
                      i,
                      a = e._targets;
                    for (n in t)
                      for (r = a.length; r--; )
                        (i = e._ptLookup[r][n]) &&
                          (i = i.d) &&
                          (i._pt && (i = nr(i, n)),
                          i && i.modifier && i.modifier(t[n], e, a[r], n));
                  })(e, n);
                };
              },
            };
          },
          ir =
            tr.registerPlugin(
              {
                name: "attr",
                init: function (e, t, n, r, i) {
                  var a, o, s;
                  for (a in ((this.tween = n), t))
                    (s = e.getAttribute(a) || ""),
                      ((o = this.add(
                        e,
                        "setAttribute",
                        (s || 0) + "",
                        t[a],
                        r,
                        i,
                        0,
                        0,
                        a
                      )).op = a),
                      (o.b = s),
                      this._props.push(a);
                },
                render: function (e, t) {
                  for (var n = t._pt; n; )
                    N ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), (n = n._next);
                },
              },
              {
                name: "endArray",
                init: function (e, t) {
                  for (var n = t.length; n--; )
                    this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
                },
              },
              rr("roundProps", Nt),
              rr("modifiers"),
              rr("snap", Bt)
            ) || tr;
        (qn.version = bn.version = ir.version = "3.12.2"),
          (G = 1),
          pe() && on();
        sn.Power0;
        var ar = sn.Power1,
          or = sn.Power2,
          sr =
            (sn.Power3,
            sn.Power4,
            sn.Linear,
            sn.Quad,
            sn.Cubic,
            sn.Quart,
            sn.Quint,
            sn.Strong,
            sn.Elastic,
            sn.Back,
            sn.SteppedEase,
            sn.Bounce,
            sn.Sine,
            sn.Expo),
          lr = sn.Circ;
        const ur = (e, t, n) => e * (1 - n) + t * n,
          cr = () => {
            const e =
                "#controlKit .panel .group-list .group .sub-group-list .sub-group .wrap .wrap",
              t = "#controlKit .panel .button, #controlKit .picker .button";
            document.querySelector(e) &&
              document
                .querySelectorAll(e)
                .forEach((e, t) => (e.style.width = 3 != t ? "30%" : "50%")),
              document.querySelector(t) &&
                ((document.querySelector(t).parentElement.style.float = "none"),
                (document.querySelector(t).parentElement.style.width =
                  "100% ")),
              document.querySelector(e + ".color") &&
                (document.querySelector(
                  e + ".color"
                ).parentElement.style.width = "60%");
          },
          dr = (e, t) => {
            let n = new r.PlaneGeometry(
              e.geometry.parameters.width,
              e.geometry.parameters.height,
              t,
              t
            );
            e.geometry.dispose(), (e.geometry = n);
          };
        function hr(e) {
          var t = e.style.transform.split(/\w+\(|\);?/);
          return t[1] && t[1].length
            ? (t = t[1].split(/,\s?/g)).map((e) =>
                parseFloat(e.replace("px", ""))
              )
            : [];
        }
        var vr = [];
        const mr = (
          e,
          t,
          i,
          a,
          {
            attributes: o,
            camera: s,
            renderer: l,
            width: u,
            height: c,
            scene: d,
            geometry: h,
            opts: v,
            effect: m = 0,
            dposition: p = 1,
          } = {}
        ) => {
          const f = "#controlKit .options";
          let g = e.getBoundingClientRect().width,
            _ = e.getBoundingClientRect().height,
            y = e.getBoundingClientRect().left;
          const b = new r.Vector2(),
            x = new r.Vector2(),
            S = [e.getAttribute("src") && e.getAttribute("src")];
          let T = [e.getAttribute("src") && new r.TextureLoader().load(S[0])];
          const w = [];
          if (e.getAttribute("src"))
            if ("video" === e.nodeName.toLowerCase()) {
              const e = document.createElement("video");
              (e.crossOrigin = "anonymous"),
                (e.src = S[0]),
                (e.muted = !0),
                (e.loop = !0),
                (e.preload = !0),
                e.play(),
                (w[0] = e);
            } else {
              const e = new Image();
              (e.crossOrigin = "anonymous"), (e.src = S[0]), (w[0] = e);
            }
          var M = new Er();
          const C = () => {
            if ("img" !== e.nodeName.toLowerCase() && !v.slideStyle) {
              M.update(),
                (M.dampen =
                  0.9 +
                  ((e, t = 1, n = 10) => Math.min(Math.max(e, t), n))(
                    v.damping || 7,
                    0,
                    9
                  ) /
                    100),
                (M.speed = Math.abs(v.scrollSpeed || 6)),
                (M.touchSpeed = Math.abs(v.touchSpeed || 6));
              let e = Math.floor((M.scrollPos + 0.5 * _) / _) * _;
              v.scrollSnapping && M.snap(e);
              let { scrollPos: t } = M;
              t < 0 && (t = 0), t > 0 && t < _ * (T.length - 1) && E(t / _);
            }
          };
          if ("img" !== e.nodeName.toLowerCase()) {
            i = i.replace(
              "!isMulti;",
              v.gooey && !0 == !v.slideStyle
                ? "       \n        vec2 pos=vec2(vuv.x,vuv.y/aspect);\n        vec2 mouse=vec2(mousei.x,(mousei.y)/aspect);\n        vec2 interpole=mix(vec2(0),vec2(metaball,noise_height),uIntercept);\n        float noise=(snoise(vec3(pos*noise_scale,time*noise_speed))+1.)/2.;\n        float val=noise*interpole.y;\n        float u=1.0-smoothstep(interpole.x,.0,distance(mouse,pos));\n        float mouseMetaball=clamp(1.-u,0.,1.);\n        val+=mouseMetaball;\n        float alpha=smoothstep(discard_threshold-antialias_threshold,discard_threshold,val);\n        gl_FragColor=vec4(mix(gl_FragColor,texture2D(uTexture[1],uv2),alpha));"
                : "float c = (sin((uv.x*7.0*snoise(vec3(uv,1.0)))+(time))/15.0*snoise(vec3(uv,1.0)))+.01;\n      float blend=uScroll-uSection;float blend2=1.-blend;vec4 imageA=texture2D(uTexture[0],vec2(uv.x,uv.y-(((texture2D(uTexture[0],uv).r*displaceAmount)*blend)*2.)))*blend2;vec4 imageB=texture2D(uTexture[1],vec2(uv.x,uv.y+(((texture2D(uTexture[1],uv).r*displaceAmount)*blend2)*2.)))*blend;\n      gl_FragColor =scrollType == 0.0? mix(texture2D(uTexture[1], uv), texture2D(uTexture[0], uv), step((uScroll)-uSection, sin(c) + uv.y)):imageA.bbra*blend+imageA*blend2+imageB.bbra*blend2+imageB*blend;"
            );
            for (let t = 0; t < e.children.length; t++)
              if (
                ((S[t] = e.children[t].getAttribute("src")),
                (T[t] = new r.TextureLoader().load(S[t])),
                t > 0 && (e.children[t].style.display = "none"),
                "video" === e.children[t].nodeName.toLowerCase())
              ) {
                const e = document.createElement("video");
                (e.crossOrigin = "anonymous"),
                  (e.src = S[t]),
                  (e.muted = !0),
                  (e.loop = !0),
                  (e.preload = !0),
                  e.play(),
                  (w[t] = e);
              } else {
                const e = new Image();
                (e.crossOrigin = "anonymous"), (e.src = S[t]), (w[t] = e);
              }
          }
          Object.assign(a, {
            zindex: { value: -9996999, range: [-9999999, 9999999] },
            aspect: { value: g / _ },
            gooey: { value: !!v.gooey },
            infiniteGooey: { value: !1 },
            growSize: { value: 4, range: [1, 15] },
            durationOut: { value: 1, range: [0.1, 5] },
            durationIn: { value: 1.5, range: [0.1, 5] },
            time: { value: 0 },
            displaceAmount: { value: 0.5 },
            mousei: { value: new r.Vector2() },
            mouse: { value: b },
            masker: { value: !1 },
            maskVal: { value: 1, range: [1, 5] },
            scrollType: { value: 0 },
            uIntercept: { value: 0 },
            geoVertex: {
              range: [1, 64],
              value: a.geoVertex ? a.geoVertex.value : 1,
            },
            noEffectGooey: { value: !0 },
            onMouse: { value: 0 },
            uSection: { value: 0 },
            isMulti: { value: !("img" === e.nodeName.toLowerCase()) },
            uScroll: { value: 0 },
            noise_speed: { value: 0.2, range: [0, 10] },
            metaball: { value: 0.2, range: [0, 2] },
            discard_threshold: { value: 0.5, range: [0, 1] },
            antialias_threshold: { value: 0.002, range: [0, 0.1] },
            noise_height: { value: 0.5, range: [0, 2] },
            noise_scale: { value: 10, range: [0, 100] },
            uTexture: {
              value: "img" === e.nodeName.toLowerCase() ? T : [T[0], T[1]],
            },
          });
          const E = (e) => {
              var t;
              e >= 0 &&
                ((a.uScroll.value = e),
                (t = Math.floor(e)),
                (a.uSection.value = t),
                T.length > t &&
                  (T.length > t + 1
                    ? (a.uTexture.value = [T[t], T[t + 1]])
                    : (a.uTexture.value = [T[T.length - 1], T[T.length - 1]])));
            },
            k =
              "vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}",
            D = new r.ShaderMaterial({
              transparent: !0,
              vertexShader: t.replace("#define SNOISEHOLDER", k),
              fragmentShader: i.replace("#define SNOISEHOLDER", k),
              uniforms: a,
            }),
            A = new r.Mesh(h, D);
          A.scale.set(g, _),
            dr(A, a.geoVertex.value),
            (A.visible = !1),
            d.add(A);
          var q = {
              backgroundImage: "",
              Mode: [
                "Off",
                "Reflect/Glow",
                "Exclusion",
                "Difference",
                "Darken",
                "ColorBurn",
                "ColorDoge",
                "SoftLight",
                "Overlay",
                "Phoenix",
                "Add",
                "Multiply",
                "Screen",
                "Negative",
                "Divide",
                "Subtract",
                "Neon",
                "Natural",
                "Mod",
                "NeonNegative",
                "Dark",
                "Average",
              ],
              "Mode Active": "Soft Light",
              Trigo: ["Sin", "Cos", "Tan", "Atan"],
              "Trig A": "Cos",
              "Trig N": "Sin",
              Mouse: ["Off", "Mode 1", " Mode 2", " Mode 3"],
              onMouse: [
                "Always Active",
                "Active On Hover",
                "Deactivate On Hover",
              ],
              Active: "Always Active",
              scrollType: ["Wave", "Morph"],
              scrollTypeIs: "Wave",
              "Mouse Active": "Off",
              Color: "#54A8FF",
              speed: {
                precise: 1,
                normal: 1,
                range: [-500, 500],
                rangep: [-10, 10],
              },
              frequency: {
                precise: 1,
                normal: 50,
                range: [-800, 800],
                rangep: [-50, 50],
              },
              Resolution_XY: {
                value: 1e3,
                range: [0, 1e3],
                precise: 1,
                rangep: [0, 100],
              },
              pixelStrength: {
                precise: 1,
                normal: 3,
                range: [-20, 100],
                rangep: [-20, 20],
              },
              strength: {
                precise: 1,
                normal: 0.2,
                range: [-40, 40],
                rangep: [-5, 5],
              },
              s: 0.6,
              range: [0.1, 1],
              f: 0.6,
              rangep: [1, 10],
            },
            O = null,
            P = null;
          const R = (e) => {
            // ((e = JSON.parse(JSON.stringify(e))).color.value = new r.Color(
            //   "#ff0000"
            // )),
              Object.assign(a, e),
              e.color && (e.color.value = new r.Color(e.color.value)),
              Object.assign(a, e),
              (document.querySelector("._canvas_container").style.zIndex =
                a.zindex.value);
          };
          v.preset &&
            fetch(v.preset)
              .then((e) => e.json())
              .then((e) => R(e)),
            v.config && R(v.config),
            v.debug &&
              !vr[m] &&
              ((vr[m] = !0),
              (O = new (F())()),
              !0 === v.gooey &&
                O.addPanel({
                  enable: !1,
                  label: "Gooey Panel",
                  width: 280,
                  fixed: !1,
                  position: [p + 300, 10],
                })
                  .addSubGroup({ label: "InfiniteGooey", enable: !1 })
                  .addCheckbox(a.infiniteGooey, "value", { label: "Enable" })
                  .addSlider(a.growSize, "value", "range", {
                    label: "Grow Size",
                    step: 0.001,
                  })
                  .addSlider(a.durationOut, "value", "range", {
                    label: "Duration Out",
                    step: 0.001,
                  })
                  .addSlider(a.durationIn, "value", "range", {
                    label: "Duration In",
                    step: 0.001,
                  })
                  .addGroup()
                  .addCheckbox(a.noEffectGooey, "value", {
                    label: "GooeyBakEffect",
                  })
                  .addSlider(a.noise_speed, "value", "range", {
                    label: "Speed",
                    step: 0.001,
                  })
                  .addSlider(a.metaball, "value", "range", {
                    label: "GooeyBall",
                    step: 0.001,
                  })
                  .addSlider(a.discard_threshold, "value", "range", {
                    label: "Threshold",
                    step: 0.001,
                  })
                  .addSlider(a.antialias_threshold, "value", "range", {
                    label: "Antialias",
                    step: 0.001,
                  })
                  .addSlider(a.noise_height, "value", "range", {
                    label: "Height",
                    step: 0.001,
                  })
                  .addSlider(a.noise_scale, "value", "range", {
                    label: "Scale",
                    step: 0.001,
                  }),
              (P = O.addPanel({
                enable: !1,
                label: "Debug Panel",
                fixed: !1,
                position: [p, 10],
                width: 280,
              })
                .addButton("Save To Clipboard", () => {
                  const {
                    uScroll: e,
                    isMulti: t,
                    uSection: n,
                    time: r,
                    resolution: i,
                    uTexture: o,
                    mouse: s,
                    mousem: l,
                    mousei: u,
                    uIntercept: c,
                    ...d
                  } = a;
                  navigator.clipboard
                    .writeText(
                      (function (e) {
                        let t = [],
                          n = JSON.stringify(e, function (e, n) {
                            if ("object" == typeof n && null !== n) {
                              if (-1 !== t.indexOf(n)) return;
                              t.push(n);
                            }
                            return n;
                          });
                        return (t = null), n;
                      })(d)
                    )
                    .then(
                      () => {
                        (document.querySelector(
                          "#controlKit .panel .button, #controlKit .picker .button"
                        ).value = "Copied Successfully"),
                          (document.querySelector(
                            "#controlKit .panel .button, #controlKit .picker .button"
                          ).style.pointerEvents = "none"),
                          (document.querySelector(
                            "body #controlKit .panel .button, #controlKit .picker .button"
                          ).style.backgroundColor = "darkgreen"),
                          (document.querySelector(
                            "body #controlKit .panel .button, #controlKit .picker .button"
                          ).style.color = "white"),
                          setTimeout(() => {
                            (document.querySelector(
                              "#controlKit .panel .button, #controlKit .picker .button"
                            ).value = "Save To Clipboard"),
                              (document.querySelector(
                                "#controlKit .panel .button, #controlKit .picker .button"
                              ).style.pointerEvents = "initial"),
                              (document.querySelector(
                                "body #controlKit .panel .button, #controlKit .picker .button"
                              ).style.backgroundColor = "#383c4a"),
                              (document.querySelector(
                                "body #controlKit .panel .button, #controlKit .picker .button"
                              ).style.color = "#8c92a4");
                          }, 1500);
                      },
                      () => {
                        (document.querySelector(
                          "#controlKit .panel .button, #controlKit .picker .button"
                        ).value = "Failed To Copy"),
                          (document.querySelector(
                            "#controlKit .panel .button, #controlKit .picker .button"
                          ).style.pointerEvents = "none"),
                          (document.querySelector(
                            "body #controlKit .panel .button, #controlKit .picker .button"
                          ).style.backgroundColor = "red"),
                          (document.querySelector(
                            "body #controlKit .panel .button, #controlKit .picker .button"
                          ).style.color = "white"),
                          setTimeout(() => {
                            (document.querySelector(
                              "#controlKit .panel .button, #controlKit .picker .button"
                            ).value = "Save To Clipboard"),
                              (document.querySelector(
                                "#controlKit .panel .button, #controlKit .picker .button"
                              ).style.pointerEvents = "initial"),
                              (document.querySelector(
                                "body #controlKit .panel .button, #controlKit .picker .button"
                              ).style.backgroundColor = "#383c4a"),
                              (document.querySelector(
                                "body #controlKit .panel .button, #controlKit .picker .button"
                              ).style.color = "#8c92a4");
                          }, 1500);
                      }
                    );
                })
                .addStringInput(a.zindex, "value", {
                  label: "Canvas Z-Index",
                  step: 1,
                  onChange: () =>
                    (document.querySelector("._canvas_container").style.zIndex =
                      a.zindex.value),
                })),
              (document.querySelector(
                "body #controlKit .panel .button, #controlKit .picker .button"
              ).style.color = "#8c92a4"),
              "img" !== e.nodeName.toLowerCase() &&
                1 != v.gooey &&
                P.addSelect(q, "scrollType", {
                  target: "scrollTypeIs",
                  label: "Scroll Type",
                  onChange: (e) => (a.scrollType.value = e),
                }),
              P.addCheckbox(a.masker, "value", {
                label: "Image Zoomer",
              }).addSlider(a.maskVal, "value", "range", {
                label: "Zoom level",
                step: 1e-5,
              }));
          const I = new r.Raycaster();
          let L = new r.Vector2(0.5, 0.5),
            z = !1;
          const N = (e) => {
            I.setFromCamera(
              new r.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                (-e.clientY / window.innerHeight) * 2 + 1
              ),
              s
            );
            const t = I.intersectObject(A);
            t.length > 0
              ? ((L = t[0].uv),
                (b.x = 2 * t[0].uv.x - 1),
                (b.y = 2 * -t[0].uv.y - 1),
                z || (z = !0))
              : z && (z = !1);
          };
          document.addEventListener("mousemove", N),
            document.addEventListener("wheel", N);
          let B = !1,
            V = 0;
          function j(e) {
            return e % S.length;
          }
          v.slideStyle && "function" == typeof v.slideStyle && v.slideStyle(E),
            v.setUniforms &&
              "function" == typeof v.setUniforms &&
              v.setUniforms(a);
          const K = a.metaball.value;
          e.addEventListener("mousedown", (e) => {
            0 == e.button &&
              !B &&
              a.infiniteGooey.value &&
              v.gooey &&
              n().to(a.metaball, {
                value: a.growSize.value,
                duration: a.durationOut.value,
                ease: sr.easeInOut,
                onStart: () => {
                  B = !0;
                },
                onComplete: () => {
                  V++,
                    (a.metaball.value = 0),
                    (B = !1),
                    (a.uTexture.value = [T[j(V)], T[j(V + 1)]]),
                    n().to(a.metaball, {
                      value: K,
                      ease: sr.easeInOut,
                      duration: a.durationIn.value,
                    });
                },
              });
          }),
            document.addEventListener("mousemove", (e) => {
              const t = window.innerWidth / 2,
                n = window.innerHeight / 2,
                r = (event.clientX - t) / t,
                i = (event.clientY - n) / n;
              (x.x = r / 300), (x.y = i / 300);
            });
          const Y = () => {
            (u = innerWidth),
              (c = innerHeight),
              l.setSize(u, c),
              l.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
              (s.fov = 2 * Math.atan(c / 2 / 10) * (180 / Math.PI)),
              (s.aspect = u / c),
              s.updateProjectionMatrix(),
              (y = e.getBoundingClientRect().left),
              (g = e.getBoundingClientRect().width),
              (_ = e.getBoundingClientRect().height),
              A.scale.set(
                e.getBoundingClientRect().width,
                e.getBoundingClientRect().height
              );
            const t = new r.Vector3();
            new r.Box3().setFromObject(A).getSize(t),
              (function (e, t, n = []) {
                return Promise.all(
                  e.map(
                    (e, i) =>
                      new Promise((a, o) => {
                        if ("video" === e.nodeName.toLowerCase())
                          e.onloadedmetadata = () => {
                            n[i] && n[i].dispose();
                            var t = new r.VideoTexture(e);
                            (t.minFilter = r.LinearFilter),
                              (t.magFilter = r.LinearFilter),
                              a(t);
                          };
                        else {
                          function s() {
                            const o = e.width,
                              s = e.height;
                            let l,
                              u,
                              c = 0,
                              d = 0;
                            o / s > t
                              ? ((l = s * t), (u = s), (c = (o - l) / 2))
                              : ((l = o), (u = o / t), (d = (s - u) / 2));
                            const h = document.createElement("canvas");
                            (h.width = l), (h.height = u);
                            h
                              .getContext("2d")
                              .drawImage(e, c, d, l, u, 0, 0, l, u),
                              n[i] && n[i].dispose();
                            const v = new r.Texture(h);
                            (v.needsUpdate = !0), a(v);
                          }
                          G && s(),
                            (e.onload = () => {
                              s(), (G = !0);
                            }),
                            (e.onerror = (e) => {
                              o(e);
                            });
                        }
                      })
                  )
                );
              })(w, t.x / t.y, T)
                .then((e) => {
                  (e.minFilter = r.LinearFilter),
                    (e.magFilter = r.LinearFilter),
                    (A.material.uniforms.uTexture.value = e),
                    (T = e),
                    (A.visible = !0);
                })
                .catch((e) => {
                  console.error("Error loading image:", e);
                }),
              (a.aspect.value = g / _);
          };
          let G = !1;
          Y(),
            setTimeout(window.dispatchEvent(new Event("resize")), 0),
            addEventListener("resize", Y);
          const X = new r.Clock();
          return (
            o.uniforms.push(a),
            o.meshes.push(A),
            {
              material: D,
              debugObj: q,
              controlKit: O,
              panel: P,
              animate: function t() {
                v.slideStyle || (1 != v.gooey && C()),
                  document.querySelector(f) &&
                    parseInt(document.querySelector(f).style.top) < 0 &&
                    (document.querySelector(f).style.top = "0px"),
                  l.render(d, s),
                  Object.assign(a, {
                    time: { value: X.getElapsedTime() },
                    mouse: { value: b },
                    mousem: { value: x },
                  }),
                  (a.mousei.value.x = r.MathUtils.lerp(
                    a.mousei.value.x,
                    L.x,
                    0.07
                  )),
                  (a.mousei.value.y = r.MathUtils.lerp(
                    a.mousei.value.y,
                    L.y,
                    0.07
                  )),
                  B ||
                    (a.uIntercept.value = r.MathUtils.lerp(
                      a.uIntercept.value,
                      z ? 1 : 0,
                      0.07
                    )),
                  (y = e.getBoundingClientRect().left),
                  (g = e.getBoundingClientRect().width),
                  (_ = e.getBoundingClientRect().height),
                  A.scale.set(
                    e.getBoundingClientRect().width,
                    e.getBoundingClientRect().height
                  ),
                  (A.material.uniforms.time.value = X.getElapsedTime()),
                  hr(e)[2] && (A.position.z = hr(e)[2]),
                  (A.position.x = y - u / 2 + g / 2),
                  (A.position.y =
                    -e.getBoundingClientRect().top + c / 2 - _ / 2),
                  requestAnimationFrame(t);
              },
              elemMesh: A,
              uniforms: A.material.uniforms,
            }
          );
        };
        var pr = null,
          fr = null;
        function gr(e = {}) {
          (pr = document.createElement("div")),
            (fr = document.createElement("div")),
            pr.classList.add("mousefollower"),
            fr.classList.add("mousefollower"),
            (fr.id = "behindmouse");
          var t = 0,
            r = 0;
          addEventListener("mousemove", function (i) {
            e.skew &&
              ((r = n().utils.clamp(15, 35, i.clientX - t)),
              (t = i.clientX),
              n().to(".mousefollower", {
                width: r + "px",
                ease: e.ease || sr.easeOut,
                duration: e.duration || 1,
              })),
              n().to(".mousefollower", {
                top: i.clientY,
                left: i.clientX,
                duration: e.duration || 1,
                ease: e.ease || sr.easeOut,
              });
          }),
            addEventListener("mouseenter", function () {
              n().to(".mousefollower", { opacity: 1 });
            }),
            addEventListener("mouseleave", function () {
              n().to(".mousefollower", {
                opacity: 0,
                duration: e.duration || 1,
                ease: e.ease || sr.easeOut,
              });
            }),
            document.body.appendChild(fr),
            document.body.appendChild(pr);
        }
        function _r(e = "img", t = {}) {
          document.querySelectorAll(e).forEach(function (e) {
            var r = e.parentNode,
              i = document.createElement("div");
            if (t.mouseFollower) {
              var a = document.createElement("div");
              (a.style.width =
                n().utils.clamp(50, 70, 0.3 * e.getBoundingClientRect().width) +
                "px"),
                (a.style.height =
                  n().utils.clamp(
                    50,
                    70,
                    0.3 * e.getBoundingClientRect().width
                  ) + "px"),
                (a.textContent = t.text || "View More"),
                a.classList.add("circle"),
                i.addEventListener("mousemove", function (e) {
                  i.appendChild(a),
                    n().to(a, {
                      top: e.clientY - i.getBoundingClientRect().y,
                      left: e.clientX - i.getBoundingClientRect().x,
                      ease: sr.easeOut,
                      duration: 2,
                    });
                }),
                i.addEventListener("mouseleave", function () {
                  n().to(a, { opacity: 0, ease: sr.easeOut, duration: 0.8 });
                });
            }
            i.classList.add("mask"),
              r.replaceChild(i, e),
              i.appendChild(e),
              i.addEventListener("mouseenter", function () {
                n().to(pr, { opacity: 0, ease: n().EasePower1 }),
                  n().to(fr, { opacity: 0, ease: n().EasePower1 }),
                  n().to(a, { opacity: 1, ease: sr.easeOut, duration: 0.8 });
              }),
              i.addEventListener("mousemove", function (r) {
                n().to(e, {
                  scale:
                    t.scale || e.getBoundingClientRect().width < 450
                      ? 1.05
                      : 1.025,
                  ease: t.ease || sr.easeOut,
                  duration: t.duration || 0.7,
                });
              }),
              i.addEventListener("mouseleave", function () {
                n().to(pr, { opacity: 1, ease: ar }),
                  n().to(fr, { opacity: 1, ease: ar }),
                  n().to(this.childNodes[0], {
                    scale: 1,
                    ease: t.ease || sr.easeOut,
                    duration: t.duration || 1,
                  });
              });
          });
        }
        function yr(e, t = {}) {
          document.querySelectorAll(e).forEach(function (e) {
            e.addEventListener("mousemove", function (r) {
              var i = e.getBoundingClientRect(),
                a = n().utils.mapRange(0, i.width, 0, 1, r.clientX - i.left),
                o = n().utils.mapRange(0, i.height, 0, 1, r.clientY - i.top);
              n().to(".mousefollower", { scale: 4, ease: or, duration: 0.5 }),
                n().to(e, {
                  x: ur(-20, 20, a),
                  y: ur(-20, 20, o),
                  duration: t.duration || 1,
                  ease: t.ease || sr.easeOut,
                });
            }),
              e.addEventListener("mouseleave", function (r) {
                n().to(".mousefollower", { scale: 1, ease: or, duration: 0.5 }),
                  n().to(e, {
                    x: 0,
                    y: 0,
                    duration: t.duration || 1,
                    ease: t.ease || sr.easeOut,
                  });
              });
          });
        }
        function br(e, t = {}) {
          var r = document.querySelectorAll(e);
          switch (
            (r.forEach(function (e) {
              (e.textContent = e.textContent.trim().replaceAll(" ", " ")),
                e.classList.add("sheryelem");
              var t = "";
              e.textContent.split("").forEach(function (e) {
                t += `<span>${e}</span>`;
              }),
                (e.innerHTML = t);
            }),
            t.style || 1)
          ) {
            case 1:
              r.forEach(function (e) {
                n().from(e.childNodes, {
                  scrollTrigger: { trigger: e, start: "top 80%" },
                  y: t.y || 10,
                  stagger: t.delay || 0.1,
                  opacity: 0,
                  duration: t.duration || 2,
                  ease: t.ease || sr.easeOut,
                });
              });
              break;
            case 2:
              r.forEach(function (e, r) {
                var i = e.childNodes.length - 1;
                for (r = 0; r < e.childNodes.length / 2; r++)
                  e.childNodes[r].dataset.delay = r;
                for (
                  r = Math.floor(e.childNodes.length / 2);
                  r < e.childNodes.length;
                  r++
                )
                  e.childNodes[r].dataset.delay = i - r;
                e.childNodes.forEach(function (e) {
                  n().from(e, {
                    y: 20,
                    delay: e.dataset.delay * (t.multiplier || 0.1),
                    opacity: 0,
                    ease: t.ease || sr.easeOut,
                  });
                });
              });
              break;
            default:
              console.warn(
                "SheryJS : no such style available for text, mentioned in textanimate()"
              );
          }
        }
        function xr(e, t) {
          function r(e) {
            return e % (t.images ? t.images.length : t.videos.length);
          }
          var i = document.body,
            a = document.createElement("div");
          a.classList.add("just-a-white-blend-screen"),
            a.classList.add("movercirc");
          var o = document.createElement("div"),
            s = null;
          if ((document.body.click(), t.images)) {
            var l = document.createElement("img");
            s = l;
          } else if (t.videos) {
            var u = document.createElement("video");
            (u.preload = !0), (u.autoplay = !0), (u.muted = !0), (s = u);
          }
          o.appendChild(s),
            i.appendChild(a),
            i.appendChild(o),
            o.classList.add("movercirc"),
            document.querySelectorAll(e).forEach(function (e, i) {
              var a,
                l = 0,
                u = 0;
              e.classList.add("hovercircle"),
                e.addEventListener("mouseenter", function (e) {
                  s.setAttribute(
                    "src",
                    t.images ? t.images[r(i)] : t.videos[r(i)]
                  );
                }),
                e.addEventListener("mousemove", function (e) {
                  var t = n().utils.pipe(
                      n().utils.clamp(-1, 1),
                      n().utils.mapRange(-1, 1, 0.8, 1.2)
                    ),
                    r = (t(e.clientX - l), t(e.clientY - u));
                  (l = e.clientX),
                    (u = e.clientY),
                    clearTimeout(a),
                    (a = setTimeout(function () {
                      n().to(".movercirc", {
                        transform: "translate(-50%,-50%)",
                      });
                    }, 500)),
                    n().to(".movercirc", {
                      left: e.clientX,
                      top: e.clientY,
                      width: "20vw",
                      height: "20vw",
                      transform: `translate(-50%,-50%) scale(${r})`,
                      ease: lr,
                      duration: 0.4,
                      opacity: 1,
                    }),
                    o.classList.add("blend");
                }),
                e.addEventListener("mouseleave", function (e) {
                  n().to(".movercirc", {
                    width: "0",
                    height: "0",
                    ease: or,
                    duration: 0.4,
                    opacity: 0,
                  }),
                    o.classList.remove("blend");
                });
            });
        }
        var Sr,
          Tr,
          wr,
          Mr = null;
        function Cr(e = "img", t = {}) {
          let n = innerWidth,
            i = innerHeight;
          const a = new r.PlaneGeometry(1, 1, 1, 1);
          null == Sr &&
            ((Sr = new r.Scene()),
            ((Tr = new r.PerspectiveCamera(70, n / i, 0.01, 1e3)).fov =
              2 * Math.atan(i / 2 / 10) * (180 / Math.PI)),
            Tr.position.set(0, 0, 10),
            (wr = new r.WebGLRenderer({ antialias: !0, alpha: !0 })).setSize(
              n,
              i
            ),
            wr.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
            (Mr = document.createElement("div")).classList.add(
              "_canvas_container"
            ),
            Mr.appendChild(wr.domElement),
            document.body.appendChild(Mr));
          const o = {
            geometry: a,
            scene: Sr,
            camera: Tr,
            renderer: wr,
            uniforms: [],
            meshes: [],
          };
          document.querySelectorAll(e).forEach(function (e) {
            switch (((e.style.opacity = "0"), t.style || 1)) {
              case 1:
                var { debugObj: l, panel: c, uniforms: h, animate: m } = mr(
                  e,
                  s(),
                  u(),
                  {
                    a: { value: 2, range: [0, 30] },
                    b: { value: 0.7, range: [-1, 1] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 1,
                    opts: t,
                    offset: -0.04,
                  }
                );
                c &&
                  (c
                    .addSelect(l, "onMouse", {
                      target: "Active",
                      label: "Effect Mode",
                      onChange: (e) => (h.onMouse.value = e),
                    })
                    .addSlider(h.a, "value", "range", {
                      label: "Speed",
                      step: 0.001,
                    })
                    .addSlider(h.b, "value", "range", {
                      label: "Wobbliness",
                      step: 0.001,
                    }),
                  cr()),
                  m();
                break;
              case 2:
                var {
                  debugObj: l,
                  controlKit: f,
                  panel: c,
                  uniforms: h,
                  animate: m,
                } = mr(
                  e,
                  d(),
                  v(),
                  {
                    resolutionXY: { value: 100 },
                    distortion: { value: !0 },
                    mode: { value: -3 },
                    mousemove: { value: 0 },
                    modeA: { value: 1 },
                    modeN: { value: 0 },
                    speed: { value: 1, range: [-500, 500], rangep: [-10, 10] },
                    frequency: {
                      value: 50,
                      range: [-800, 800],
                      rangep: [-50, 50],
                    },
                    angle: { value: 0.5, range: [0, Math.PI] },
                    waveFactor: { value: 1.4, range: [-3, 3] },
                    color: { value: new r.Color(0.33, 0.66, 1) },
                    pixelStrength: {
                      value: 3,
                      range: [-20, 100],
                      rangep: [-20, 20],
                    },
                    quality: { value: 5, range: [0, 10] },
                    contrast: { value: 1, range: [-25, 25] },
                    brightness: { value: 1, range: [-1, 25] },
                    colorExposer: { value: 0.182, range: [-5, 5] },
                    strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
                    exposer: { value: 8, range: [-100, 100] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 2,
                    opts: t,
                    dposition: 380,
                  }
                );
                c &&
                  (c
                    .addCheckbox(h.distortion, "value", {
                      label: "Distortion Effect",
                    })
                    .addSelect(l, "onMouse", {
                      target: "Active",
                      label: "Effect Mode",
                      onChange: (e) => (h.onMouse.value = e),
                    })
                    .addSelect(l, "Mode", {
                      target: "Mode Active",
                      label: "Blend/Overlay Mode",
                      onChange: (e) => (h.mode.value = e - 10),
                    })
                    .addSelect(l, "Mouse", {
                      target: "Mouse Active",
                      label: "Mousemove Effect",
                      onChange: (e) => (h.mousemove.value = e),
                    })
                    .addSelect(l, "Trigo", {
                      target: "Trig A",
                      label: "Effect StyleA",
                      onChange: (e) => (h.modeA.value = e),
                    })
                    .addSelect(l, "Trigo", {
                      target: "Trig N",
                      label: "Effect StyleN",
                      onChange: (e) => (h.modeN.value = e),
                    })
                    .addColor(l, "Color", {
                      colorMode: "hex",
                      onChange: (e) => h.color.value.set(e),
                    }),
                  f
                    .addPanel({
                      enable: !1,
                      label: "Controls Panel",
                      width: 350,
                      fixed: !1,
                      position: [10, 10],
                    })
                    .addSlider(l.speed, "normal", "range", {
                      label: "Speed",
                      step: 1e-5,
                      onChange: () => (h.speed.value = l.speed.normal),
                    })
                    .addSlider(l.speed, "precise", "rangep", {
                      label: "Speed Precise",
                      step: 1e-5,
                      onChange: () => (h.speed.value = l.speed.precise),
                    })
                    .addSlider(l.frequency, "normal", "range", {
                      label: "Frequency",
                      step: 1e-5,
                      onChange: () => (h.frequency.value = l.frequency.normal),
                    })
                    .addSlider(l.frequency, "precise", "rangep", {
                      label: "Frequency Precise",
                      step: 1e-5,
                      onChange: () => (h.frequency.value = l.frequency.precise),
                    })
                    .addSlider(l.Resolution_XY, "value", "range", {
                      label: "Resolution",
                      step: 1e-5,
                      onChange: () => {
                        h.resolutionXY.value = l.Resolution_XY.value;
                      },
                    })
                    .addSlider(l.Resolution_XY, "precise", "rangep", {
                      label: "Resolution Precise",
                      step: 1e-5,
                      onChange: () => {
                        h.resolutionXY.value = l.Resolution_XY.precise;
                      },
                    })
                    .addSlider(h.angle, "value", "range", {
                      label: "Angle",
                      step: 1e-5,
                    })
                    .addSlider(h.waveFactor, "value", "range", {
                      label: "Wave Factor",
                      step: 1e-5,
                    })
                    .addSlider(l.pixelStrength, "normal", "range", {
                      label: "Pixel Strength",
                      step: 1e-5,
                      onChange: () =>
                        (h.pixelStrength.value = l.pixelStrength.normal),
                    })
                    .addSlider(l.pixelStrength, "precise", "rangep", {
                      label: "Precise Pixel",
                      step: 1e-5,
                      onChange: () =>
                        (h.pixelStrength.value = l.pixelStrength.normal),
                    })
                    .addSlider(h.quality, "value", "range", {
                      label: "Quality",
                      step: 1e-5,
                    })
                    .addSlider(h.contrast, "value", "range", {
                      label: "Contrast",
                      step: 1e-5,
                    })
                    .addSlider(h.brightness, "value", "range", {
                      label: "Brightness",
                      step: 1e-5,
                    })
                    .addSlider(h.colorExposer, "value", "range", {
                      label: "Color Exposer",
                      step: 1e-5,
                    })
                    .addSlider(l.strength, "normal", "range", {
                      label: "Strength",
                      step: 1e-5,
                      onChange: (e) => (h.strength.value = l.strength.normal),
                    })
                    .addSlider(l.strength, "precise", "rangep", {
                      label: "Strength Precise",
                      step: 1e-5,
                      onChange: (e) => (h.strength.value = l.strength.precise),
                    })
                    .addSlider(h.exposer, "value", "range", {
                      label: "Exposer",
                      step: 1e-5,
                    }),
                  cr()),
                  m();
                break;
              case 3:
                var {
                  debugObj: l,
                  panel: c,
                  elemMesh: _,
                  uniforms: h,
                  animate: m,
                } = mr(
                  e,
                  p(),
                  g(),
                  {
                    uFrequencyX: { value: 12, range: [0, 100] },
                    uFrequencyY: { value: 12, range: [0, 100] },
                    uFrequencyZ: { value: 10, range: [0, 100] },
                    geoVertex: { value: 32, range: [1, 64] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 3,
                    opts: t,
                    fov: 1.0375,
                    size: 0.01744,
                    offset: -0.04,
                  }
                );
                c &&
                  (c
                    .addSelect(l, "onMouse", {
                      target: "Active",
                      label: "Effect Mode",
                      onChange: (e) => (h.onMouse.value = e),
                    })
                    .addSlider(h.geoVertex, "value", "range", {
                      label: "VertexCount",
                      step: 1,
                      onChange: () => {
                        dr(_, h.geoVertex.value);
                      },
                    })
                    .addSlider(h.uFrequencyX, "value", "range", {
                      label: "FrequencyX",
                      step: 0.01,
                    })
                    .addSlider(h.uFrequencyY, "value", "range", {
                      label: "FrequencyY",
                      step: 0.01,
                    })
                    .addSlider(h.uFrequencyZ, "value", "range", {
                      label: "FrequencyZ",
                      step: 0.01,
                    }),
                  cr()),
                  m();
                break;
              case 4:
                var {
                  debugObj: l,
                  panel: c,
                  elemMesh: _,
                  uniforms: h,
                  animate: m,
                } = mr(
                  e,
                  y(),
                  x(),
                  {
                    uColor: { value: !1 },
                    uSpeed: { value: 0.6, range: [0.1, 1], rangep: [1, 10] },
                    uAmplitude: { value: 1.5, range: [0, 5] },
                    uFrequency: { value: 3.5, range: [0, 10] },
                    geoVertex: { value: 32, range: [1, 64] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 4,
                    opts: t,
                    offset: -0.04,
                  }
                );
                t.config &&
                  Object.keys(t.config).forEach(
                    (e) => (h[e].value = t.config[e].value)
                  ),
                  c &&
                    (c
                      .addCheckbox(h.uColor, "value", { label: "Color Depth" })
                      .addSelect(l, "onMouse", {
                        target: "Active",
                        label: "Effect Mode",
                        onChange: (e) => (h.onMouse.value = e),
                      })
                      .addSlider(h.geoVertex, "value", "range", {
                        label: "VertexCount",
                        step: 1,
                        onChange: () => dr(_, h.geoVertex.value),
                      })
                      .addSlider(l, "s", "range", {
                        label: "Speed",
                        onChange: () => (h.uSpeed.value = l.s),
                        step: 0.01,
                      })
                      .addSlider(l, "f", "rangep", {
                        label: "FastForward",
                        onChange: () => (h.uSpeed.value = l.f),
                        step: 0.01,
                      })
                      .addSlider(h.uAmplitude, "value", "range", {
                        label: "Amplitude",
                        step: 0.01,
                      })
                      .addSlider(h.uFrequency, "value", "range", {
                        label: "Frequency",
                        step: 0.01,
                      }),
                    cr()),
                  m();
                break;
              case 5:
                var { debugObj: l, panel: c, uniforms: h, animate: m } = mr(
                  e,
                  T(),
                  M(),
                  {
                    a: { value: 2, range: [0, 30] },
                    b: { value: 1 / 1.333, range: [-1, 1] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 5,
                    opts: t,
                    fov: 0.9,
                    onDoc: !0,
                    offset: -0.04,
                  }
                );
                c &&
                  (c
                    .addSelect(l, "onMouse", {
                      target: "Active",
                      label: "Effect Mode",
                      onChange: (e) => (h.onMouse.value = e),
                    })
                    .addSlider(h.a, "value", "range", {
                      label: "Speed",
                      step: 0.001,
                    })
                    .addSlider(h.b, "value", "range", {
                      label: "Wobbliness",
                      step: 0.001,
                    }),
                  cr()),
                  m();
                break;
              case 6:
                var { debugObj: l, panel: c, uniforms: h, animate: m } = mr(
                  e,
                  E(),
                  D(),
                  {
                    noiseDetail: { value: 7.44, range: [0, 100] },
                    distortionAmount: { value: 2.98, range: [0, 10] },
                    scale: { value: 36.36, range: [0, 100] },
                    speed: { value: 0.79, range: [0, 1] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 6,
                    opts: t,
                  }
                );
                c &&
                  (c
                    .addSlider(h.speed, "value", "range", {
                      label: "speed",
                      step: 0.001,
                    })
                    .addSlider(h.scale, "value", "range", {
                      label: "scale",
                      step: 0.001,
                    })
                    .addSlider(h.distortionAmount, "value", "range", {
                      label: "Amount",
                      step: 0.001,
                    })
                    .addSlider(h.noiseDetail, "value", "range", {
                      label: "noiseDetail",
                      step: 0.001,
                    }),
                  cr()),
                  m();
                break;
              case 7:
                var { debugObj: l, panel: c, uniforms: h, animate: m } = mr(
                  e,
                  q(),
                  P(),
                  {
                    invert: { value: !1 },
                    isTexture: { value: !1 },
                    autorotate: { value: !0 },
                    mouseMove: { value: !0 },
                    color: { value: new r.Color(16777215) },
                    mouseMoveEWX: { value: 0, range: [0, 1] },
                    mouseMoveEHY: { value: 0.07, range: [0, 1] },
                    smoothness: { value: 1.44, range: [0, 3] },
                    circular: { value: 0, range: [-0.1, 0.1] },
                    styling: { value: 0.82, range: [-3, 3] },
                    clustering: { value: 5, range: [0, 5] },
                    gapping: { value: 0.63, range: [0, 1] },
                    rotation: { value: 60, range: [0, 90] },
                    density: { value: 0.07, range: [0, 1] },
                    scale: { value: 42, range: [0, 100] },
                    pattern: { value: 5.58, range: [0, 15] },
                  },
                  {
                    camera: Tr,
                    attributes: o,
                    renderer: wr,
                    width: n,
                    height: i,
                    scene: Sr,
                    geometry: a,
                    effect: 7,
                    opts: t,
                  }
                );
                c &&
                  (c
                    .addCheckbox(h.invert, "value", { label: "Invert" })
                    .addCheckbox(h.autorotate, "value", {
                      label: "Auto Rotate",
                    })
                    .addCheckbox(h.mouseMove, "value", {
                      label: "Mouse Effect",
                    })
                    .addSlider(h.mouseMoveEWX, "value", "range", {
                      label: "EWX",
                      step: 0.001,
                    })
                    .addSlider(h.mouseMoveEHY, "value", "range", {
                      label: "EHY",
                      step: 0.001,
                    })
                    .addSlider(h.rotation, "value", "range", {
                      label: "Rotation",
                      step: 0.001,
                    })
                    .addSlider(h.scale, "value", "range", {
                      label: "Scale",
                      step: 0.001,
                    })
                    .addSlider(h.pattern, "value", "range", {
                      label: "Pattern",
                      step: 0.001,
                    })
                    .addSlider(h.density, "value", "range", {
                      label: "Density",
                      step: 0.001,
                    })
                    .addSlider(h.clustering, "value", "range", {
                      label: "Clustering",
                      step: 0.001,
                    })
                    .addSlider(h.gapping, "value", "range", {
                      label: "Gapping",
                      step: 0.001,
                    })
                    .addSlider(h.smoothness, "value", "range", {
                      label: "Smoothness",
                      step: 0.001,
                    })
                    .addSlider(h.styling, "value", "range", {
                      label: "Styling",
                      step: 0.001,
                    })
                    .addSlider(h.circular, "value", "range", {
                      label: "Ring Contrast",
                      step: 0.001,
                    })
                    .addColor(l, "Color", {
                      colorMode: "hex",
                      onChange: (e) => h.color.value.set(e),
                    })
                    .addStringInput(l, "backgroundImage", {
                      label: "Effect Background Image Source",
                      onChange: () => {
                        "" == l.backgroundImage
                          ? (h.isTexture.value = !1)
                          : (h.isTexture.value = !0),
                          (h.uTexture.value[2] = new r.TextureLoader().load(
                            l.backgroundImage
                          ));
                      },
                    }),
                  cr()),
                  m();
            }
          }),
            t.setAttribute &&
              "function" == typeof t.setAttribute &&
              t.setAttribute(o);
        }
        class Er {
          constructor() {
            (this.acceleration = 0),
              (this.maxAcceleration = 5),
              (this.maxSpeed = 20),
              (this.velocity = 0),
              (this.dampen = 0.97),
              (this.speed = 8),
              (this.touchSpeed = 8),
              (this.scrollPos = 0),
              (this.velocityThreshold = 1),
              (this.snapToTarget = !1),
              (this.mouseDown = !1),
              (this.lastDelta = 0),
              document.addEventListener(
                "touchstart",
                (e) => e.preventDefault(),
                { passive: !1 }
              ),
              window.addEventListener("touchend", () => (this.lastDelta = 0)),
              window.addEventListener("touchmove", (e) => {
                let t = this.lastDelta - e.targetTouches[0].clientY;
                this.accelerate(Math.sign(t) * this.touchSpeed),
                  (this.lastDelta = e.targetTouches[0].clientY);
              }),
              window.addEventListener("wheel", (e) => {
                this.accelerate(Math.sign(e.deltaY) * this.speed);
              }),
              window.addEventListener("mousemove", (e) => {
                if (this.mouseDown) {
                  let t = this.lastDelta - e.clientY;
                  this.accelerate(Math.sign(t) * this.touchSpeed * 0.4),
                    (this.lastDelta = e.clientY);
                }
              }),
              window.addEventListener("mouseup", () => {
                (this.lastDelta = 0), (this.mouseDown = !1);
              });
          }
          accelerate(e) {
            this.acceleration < this.maxAcceleration &&
              (this.acceleration += e);
          }
          update() {
            (this.velocity += this.acceleration),
              Math.abs(this.velocity) > this.velocityThreshold
                ? ((this.velocity *= this.dampen),
                  (this.scrollPos += this.velocity),
                  (this.scrollPos = this.scrollPos >= 0 ? this.scrollPos : 0))
                : (this.velocity = 0),
              Math.abs(this.velocity) > this.maxSpeed &&
                (this.velocity = Math.sign(this.velocity) * this.maxSpeed),
              (this.acceleration = 0);
          }
          snap(e, t = 100, n = 1.5) {
            Math.abs(e - this.scrollPos) < t && (this.velocity *= this.dampen),
              Math.abs(this.velocity) < this.velocityThreshold + n &&
                (this.scrollPos += 0.1 * (e - this.scrollPos));
          }
          project(e = 1) {
            if (1 === e) return this.scrollPos + this.velocity * this.dampen;
            for (var t = this.scrollPos, n = this.velocity, r = 0; r < e; r++)
              t += n *= this.dampen;
            return t;
          }
        }
        const kr = e;
      })(),
      o
    );
  })()
);
