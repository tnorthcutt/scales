import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FishScalePattern = () => {
  const [scaleWidth, setScaleWidth] = useState(40);
  const [scaleHeight, setScaleHeight] = useState(30);
  const [verticalOverlap, setVerticalOverlap] = useState(20);
  const [rows, setRows] = useState(4);
  const [color1, setColor1] = useState("#8b1a1a");
  const [color2, setColor2] = useState("#2f4f4f");

  const generateScales = () => {
    let scales = [];
    const effectiveRowHeight = scaleHeight - verticalOverlap;

    // Start from top (row 0) and work down
    for (let row = 0; row < rows; row++) {
      // Calculate Y position from top down
      const yBase = row * effectiveRowHeight;
      const color = row % 2 === 0 ? color1 : color2;
      const scalesInRow = Math.ceil(400 / scaleWidth) + 1;

      scales.push(
        // Using push instead of unshift since we're going top-down
        <g key={`row-${row}`}>
          {Array.from({ length: scalesInRow }, (_, i) => {
            const x = i * scaleWidth;

            // Bottom curve for all rows
            const bottomCurve = `
              v ${scaleHeight - scaleHeight / 4}
              q ${scaleWidth / 2} ${scaleHeight / 4} ${scaleWidth} 0
            `;

            // Top curve (except for first row)
            const topCurve =
              row > 0
                ? `q -${scaleWidth / 2} ${scaleHeight / 4} -${scaleWidth} 0`
                : `h -${scaleWidth}`;

            const path = `
              M ${x + scaleWidth} ${yBase}
              ${topCurve}
              ${bottomCurve}
              Z
            `;

            return (
              <path
                key={`scale-${row}-${i}`}
                d={path}
                fill={color}
              />
            );
          })}
        </g>
      );
    }
    return scales;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fish Scale Pattern Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:grid md:grid-cols-2 md:gap-8">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Row Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="p-1 w-16 h-10"
                />
                <Input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Second Row Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="p-1 w-16 h-10"
                />
                <Input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Scale Width: {scaleWidth}px</Label>
            <Slider
              value={[scaleWidth]}
              onValueChange={([value]) => setScaleWidth(value)}
              min={20}
              max={80}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label>Scale Height: {scaleHeight}px</Label>
            <Slider
              value={[scaleHeight]}
              onValueChange={([value]) => setScaleHeight(value)}
              min={20}
              max={80}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label>Vertical Overlap: {verticalOverlap}px</Label>
            <Slider
              value={[verticalOverlap]}
              onValueChange={([value]) => setVerticalOverlap(value)}
              min={0}
              max={60}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <Label>Rows: {rows}</Label>
            <Slider
              value={[rows]}
              onValueChange={([value]) => setRows(value)}
              min={1}
              max={8}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded border">
          <svg
            viewBox={`0 0 400 ${Math.max(
              200,
              rows * (scaleHeight - verticalOverlap) + scaleHeight
            )}`}
            className="w-full h-auto bg-cream"
            style={{ backgroundColor: "#e8e0d4" }}
          >
            {generateScales()}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default FishScalePattern;
