varying vec2 v_uv;
varying vec3 v_instanceColor;

void main() { gl_FragColor = vec4(v_instanceColor, 1.); }
