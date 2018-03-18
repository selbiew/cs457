#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;
uniform float uWaveFreq, uWaveAmp;
uniform float uFloorFreq, uFloorAmp;
uniform float uRippleFreq, uRippleAmp;
uniform float uWaterHeight;
uniform sampler3D Noise3;
uniform float Timer;
uniform bool uIsWaves;
uniform bool uAnimate;

flat out vec3 vNf;
out vec3 vNs;
flat out vec3 vLf;
out vec3 vLs;
flat out vec3 vEf;
out vec3 vEs;
vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

out float isWater;

void
main( )
{
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vNf = normalize( gl_NormalMatrix * gl_Normal ); // surface normal vector
	vNs = vNf;
	vLf = eyeLightPosition - ECposition.xyz; // vector from the point
	vLs = vLf; // to the light position
	vEf = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
	vEs = vEf ; // to the eye position
	
	vec4 pertVert = gl_Vertex;
	
	float t = 1;
	if(uAnimate)
		t = sin(2*3.14*Timer);
	
	isWater = 0.0;
	
	vec4 nvw = texture( Noise3, uWaveFreq*pertVert.xyz);
	vec4 nvf = texture( Noise3, uFloorFreq*pertVert.xyz);
	float wave_noise = uWaveAmp * ((nvw.r + nvw.g + nvw.b + nvw.a) - 2.) + 0.2*sin(pertVert.x * uWaveFreq*t);
	float floor_noise = (nvf.r + nvf.g + nvf.b + nvf.a - 2.) * uFloorAmp;
	
	if(pertVert.y >= uWaterHeight + floor_noise)
		isWater = 1.0;
	
	if(uIsWaves) {
		if(isWater > 0.5) {
			pertVert.y += wave_noise;
		}
	}
	else {
		float radius = pow(pow(pertVert.x, 2.) + pow(pertVert.z, 2.), 0.5);
		float ripple_noise = uRippleAmp*sin(uRippleFreq*radius*t);
		if(isWater > 0.5)
			pertVert.y += ripple_noise;
	}
	
	gl_Position = gl_ModelViewProjectionMatrix * pertVert;
}