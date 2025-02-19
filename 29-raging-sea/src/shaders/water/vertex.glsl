uniform float uTime;
uniform float uBigWavesElevation;
uniform float uBigWavesSpeed;
uniform vec2 uBigWavesFrequency;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed)
            * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed)
            * uBigWavesElevation;
    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}
