import { parse as argparse } from "https://deno.land/std@0.181.0/flags/mod.ts";
import { default as imgToSvg } from "npm:pixel-art-2-svg@0.1.5";
import { parse as pathparse } from "https://deno.land/std@0.188.0/path/mod.ts";

const args = argparse(Deno.args, {
  boolean: [
    // instructions for this script
    "help",

    // verbose
    "verbose",
  ],
});

const commandName = `png2svg`;

const usageMessage = `
Usage: ${commandName} [OPTIONS] [PNG-FILE ...]
Convert png files to svg

Options:
  --help              Show this help message
  --verbose           Verbose processing messages


  Examples:
  ${commandName} example.png
  ${commandName} 1.png 2.png 3.png
`;

// parse args
const help = args.help;
const verbose = args.verbose;

if (help) {
  console.log(usageMessage);
  Deno.exit();
}

for (let imgFilename of args._) {
  let result = await imgToSvg(imgFilename);
  if (verbose) {
    console.debug(`Input: ${imgFilename}`);
  }
  let svgFilename = pathparse(imgFilename).name + ".svg";
  if (verbose) {
    console.debug(`  Output: ${svgFilename}`);
  }
  Deno.writeTextFileSync(svgFilename, result);
}

Deno.exit();
