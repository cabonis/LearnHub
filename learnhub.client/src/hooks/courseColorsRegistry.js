const colors = [
    "#FF5733", // Bright Orange
    "#33A1FF", // Sky Blue
    "#FF33A8", // Pink
    "#33FF57", // Bright Green
    "#FFB733", // Gold
    "#8D33FF", // Purple
    "#33FFF6", // Cyan
    "#FF3357", // Coral Red
    "#33FF94", // Mint Green
    "#FF33E3", // Magenta
    "#B6FF33", // Lime
    "#3357FF", // Blue
    "#FF8E33", // Orange
    "#33FFB5", // Light Teal
    "#FF33B5", // Deep Pink
    "#DFFF33", // Chartreuse
    "#33FF83", // Pastel Green
    "#FF5733", // Bright Red-Orange
    "#57FF33", // Bright Lime Green
    "#FFA833"  // Amber
];

let courseColors = {};
let index = 0;

const getCourseColor = (course) => {

    if (course in courseColors) {
        return courseColors[course];
    }

    const color = colors[index++];
    courseColors = {
        ...courseColors,
        [course]: color
    };

    return color;
}

export default getCourseColor;