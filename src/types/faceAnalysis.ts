export interface FaceBox {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Face {
  face_box: FaceBox;
  det_core: number;
  pose: [number, number, number];
  gender: number;
  age: number;
  landmark_3d_68: [number, number, number][];
  landmark_2d_106: [number, number][];
}

export interface FaceAnalysisResult {
  faces: Face[];
}