varying vec2 v_uv;
varying vec3 v_instanceColor;

void main() {
  v_uv = uv;
  v_instanceColor = instanceColor;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix *
                vec4(position, 1.0);
}