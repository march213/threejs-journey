varying vec2 vUv;

#define PI 3.141592653589793

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
    // Pattern #3
    // float strength = vUv.x;

    // Pattern #4
    // float strength = vUv.y;

    // Pattern #5
    // float strength = 1.0 - vUv.y;

    // Pattern #6
    // float strength = vUv.y * 10.0;

    // Pattern #7
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern #8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // avoid using if statements in shaders (not efficient)
    // also avoid ternary operators for the same reason
    // strength = strength < 0.5 ? 0.0 : 1.0;
    // strength = step(0.5, strength);

    // Pattern #9
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern #10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern #11
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // strength += mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern #12
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern #13
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.4, strength);
    // strength *= mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern #14
    // float horizontalBar = step(0.4, mod(vUv.x * 10.0, 1.0));
    // horizontalBar *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // float verticalBar = step(0.4, mod(vUv.y * 10.0, 1.0));
    // verticalBar *= step(0.8, mod(vUv.x * 10.0, 1.0));
    // float strength = horizontalBar + verticalBar;

    // Pattern #15
    // float horizontalBar = step(0.4, mod(vUv.x * 10.0, 1.0));
    // horizontalBar *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // float verticalBar = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // verticalBar *= step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = horizontalBar + verticalBar;

    // Pattern #16
    // float strength = abs(vUv.x - 0.5);

    // Pattern #17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // Pattern #18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // Pattern #19
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // strength = step(0.2, strength);

    // Pattern #20
    // float squareOne = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // squareOne = step(0.2, squareOne);
    // float squareTwo = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // squareTwo = 1.0 - step(0.25, squareTwo);
    // float strength = squareOne * squareTwo;

    // Pattern #21
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // Pattern #22
    // float strength = floor(vUv.x * 10.0) / 10.0;
    // strength *= floor(vUv.y * 10.0) / 10.0;

    // Pattern #23
    // float strength = random(vUv);

    // Pattern #24
    // vec2 gridUV = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUV);

    // Pattern #25
    // vec2 gridUV = vec2(
    //     floor(vUv.x * 10.0) / 10.0,
    //     floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0
    // );
    // float strength = random(gridUV);

    // Pattern #26
    // float strength = length(vUv);

    // Pattern #27
    // float strength = distance(vUv, vec2(0.5));

    // Pattern #28
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // Pattern #29
    // float strength = 0.015 /  distance(vUv, vec2(0.5));

    // Pattern #30
    // vec2 lightUV = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y * 0.5 + 0.25
    // );
    // float strength = 0.015 /  distance(lightUV, vec2(0.5));

    // Pattern #31
    // vec2 lightUVX = vec2(vUv.x * 0.1 + 0.45,vUv.y * 0.5 + 0.25);
    // float lightX = 0.015 /  distance(lightUVX, vec2(0.5));
    // vec2 lightUVY = vec2(vUv.y * 0.1 + 0.45,vUv.x * 0.5 + 0.25);
    // float lightY = 0.015 /  distance(lightUVY, vec2(0.5));
    // float strength = lightX * lightY;

    // Pattern #32
    // vec2 rotatedUV = rotate(vUv, PI * 0.25, vec2(0.5));
    // vec2 lightUVX = vec2(rotatedUV.x * 0.1 + 0.45,rotatedUV.y * 0.5 + 0.25);
    // float lightX = 0.015 /  distance(lightUVX, vec2(0.5));
    // vec2 lightUVY = vec2(rotatedUV.y * 0.1 + 0.45,rotatedUV.x * 0.5 + 0.25);
    // float lightY = 0.015 /  distance(lightUVY, vec2(0.5));
    // float strength = lightX * lightY;

    // Pattern #33
    // float strength = step(0.25, distance(vUv, vec2(0.5)));

    // Pattern #34
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // Pattern #35
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // Pattern #36
    // vec2 waveUV = vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // Pattern #37
    // vec2 waveUV = vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1);
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // Pattern #38
    // vec2 waveUV = vec2(
    //         vUv.x + sin(vUv.y * 100.0) * 0.1,
    //         vUv.y + sin(vUv.x * 100.0) * 0.1
    //     );
    // float strength = 1.0 - step(0.01, abs(distance(waveUV, vec2(0.5)) - 0.25));

    // Pattern #39
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // Pattern #40
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;

    // Pattern #41
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = angle;

    // Pattern #42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // angle *= 30.0;
    // angle = mod(angle, 1.0);
    // float strength = angle;

    // Pattern #43
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = sin(angle * 100.0);

    // Pattern #44
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float sinusoid = sin(angle * 100.0);

    float radius = 0.25 + sinusoid * 0.02;
    float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    gl_FragColor = vec4(vec3(strength), 1.0);
}
