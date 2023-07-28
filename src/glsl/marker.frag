varying vec2 v_uv;
varying vec3 v_instanceColor;
uniform float u_hoverIntensity;

void main() { gl_FragColor = vec4(v_instanceColor * u_hoverIntensity, 1.); }
