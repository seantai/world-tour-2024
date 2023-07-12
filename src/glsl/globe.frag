varying vec2 v_uv;
uniform sampler2D u_neon;
uniform sampler2D u_day;
uniform sampler2D u_night;
uniform float u_time;

// #include snoise.glsl

void main() {
  float intensity = sin(u_time);
  vec4 night = texture2D(u_night, v_uv) * intensity;
  vec4 day = texture2D(u_neon, v_uv);

  vec4 final = mix(night, day, .37);
  gl_FragColor = final;
}
