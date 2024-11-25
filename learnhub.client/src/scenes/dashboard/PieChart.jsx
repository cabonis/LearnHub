import { Box, useTheme } from "@mui/material";
import AutoSizer from 'react-virtualized-auto-sizer'
import { Pie } from '@nivo/pie'
import getCourseColor from "../../hooks/courseColorsRegistry";

const PieChart = ({ data, value }) => {

    const theme = useTheme();

    return (
        <AutoSizer>
            {({ height, width }) => (
                <Pie
                    theme={{
                        tooltip: {
                            container: {
                                background: theme.palette.primary.main,
                                color: theme.palette.neutral.light
                            }
                        },
                        text: {
                            fontSize: 14,
                            fontWeight: "bold"
                        }
                    }}
                    height={height}
                    width={width}
                    colors={({ id, data }) => getCourseColor(data[`id`])}
                    data={data}
                    value={value}
                    margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
                    innerRadius={0.5}
                    padAngle={3}
                    cornerRadius={3}
                    activeInnerRadiusOffset={15}
                    activeOuterRadiusOffset={15}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                '0.2'
                            ]
                        ]
                    }}
                    enableArcLinkLabels={false}
                    arcLabelsSkipAngle={10}
                />
            )}
        </AutoSizer>
    )
}


export default PieChart;