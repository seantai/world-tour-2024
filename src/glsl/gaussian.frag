varying vec2 v_uv;

// uniform sampler2D u_neon;
// uniform sampler2D u_day;
// uniform sampler2D u_night;
// uniform float u_time;

// #include snoise.glsl
#pragma glslify : blur = require('glsl-fast-gaussian-blur')

void main() {

  // vec4 night = texture2D(u_night, v_uv);
  // vec4 day = texture2D(u_neon, v_uv);

  // vec4 final = mix(night, day, .5);
  gl_FragColor = vec4(1., 0., .4, 1.);
}
