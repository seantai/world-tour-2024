varying vec2 v_uv;
uniform sampler2D u_neon;
uniform sampler2D u_night;
uniform float u_time;

void main() {
  float intensity = sin(u_time) + 1.2;
  vec4 night = texture2D(u_night, v_uv) * intensity;
  vec4 neon = texture2D(u_neon, v_uv);

  vec4 final = mix(night, neon, .65);
  gl_FragColor = final;
}
