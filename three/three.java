package com.example.threejs;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public class Three {

    // --- SPHERE GEOMETRY (r147 Specific) ---
    public interface SphereGeometry extends JSObject {}

    /**
     * Maps to: new THREE.SphereGeometry(radius, widthSegments, heightSegments);
     * Default smooth values for a clean ball shape: segments of 32x16 or 64x32.
     */
    @JSBody(
        params = { "radius", "widthSegments", "heightSegments" }, 
        script = "return new THREE.SphereGeometry(radius, widthSegments, heightSegments);"
    )
    public static native SphereGeometry SphereGeometry(double radius, int widthSegments, int heightSegments);

    // --- SCENE & MESH HOOKS ---
    public interface Scene extends JSObject {
        void add(JSObject object);
    }
    @JSBody(script = "return new THREE.Scene();")
    public static native Scene Scene();

    public interface MeshBasicMaterial extends JSObject {}
    @JSBody(params = { "colorHex", "wireframe" }, script = "return new THREE.MeshBasicMaterial({ color: colorHex, wireframe: wireframe });")
    public static native MeshBasicMaterial MeshBasicMaterial(int colorHex, boolean wireframe);

    public interface Mesh extends JSObject {
        @JSProperty Vector3 getRotation();
    }
    @JSBody(params = { "geometry", "material" }, script = "return new THREE.Mesh(geometry, material);")
    public static native Mesh Mesh(SphereGeometry geometry, MeshBasicMaterial material);

    public interface Vector3 extends JSObject {
        void set(double x, double y, double z);
        @JSProperty void setX(double x);
        @JSProperty void setY(double y);
    }
}
