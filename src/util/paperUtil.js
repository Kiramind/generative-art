const paper = require('paper');

const PaperUtil = {
  shapedPath(pattern, center) {
    var path;
    switch (pattern.type) {
      case "circle": // size1: radius
      case "cercle": // size1: radius
      case 0: // size1: radius
        path = paper.Path.Circle(center, pattern.radius1);
        break;
      case "rectangle": // size1: width, size2: length
      case 1:
        path = paper.Path.Rectangle(center, new paper.Size(pattern.width, pattern.height));
        break;
      case "ellipse": // size1: width, size2: length
      case "éllipse": // size1: width, size2: length
      case 2:
        path = paper.Path.Ellipse({
            point: center,
            size: [pattern.width, pattern.height]
        });
        break;
      case "polygon": // size1: sides, size2: radius
      case "polygone": // size1: sides, size2: radius
      case 3:
        path = paper.Path.RegularPolygon({
            center: center,
            sides: pattern.sides,
            radius: pattern.radius1,
        });
        break;
      case "star": // size1: sides, size2: radius
      case "étoile": // size1: sides, size2: radius
      case 4:
      default:
        path = paper.Path.Star({
          center: center,
          points: pattern.sides,
          radius1: pattern.radius1,
          radius2: pattern.radius2,
      });
        break;
    }
    path.strokeColor = pattern.strokeColor;
    path.strokeWidth = pattern.strokeWidth;
    path.fillColor = pattern.fillColor;

    return path
  },
}

export default PaperUtil
