import {homedir} from "os";
import * as path from "path";
import {readFileSync} from "fs";
import {parse} from "yaml";

// Suppress noisy YAML warning
process.env.YAML_SILENCE_WARNINGS = "true";

const defaultCactusRoot = path.resolve(homedir(), ".cactus", "mainnet");

export const cactusRoot = process.env.CACTUS_ROOT ? path.resolve(process.env.CACTUS_ROOT) : defaultCactusRoot;

// config 
export const configPath = path.resolve(cactusRoot, "config", "config.yaml");

// log
export const logDir = path.resolve(cactusRoot, "log");

// plotter
export const plotterDir = path.resolve(cactusRoot, "plotter");

export type TConfig = Record<string, string|number|Array<string|number>|null>;

let lastConfigPath: string|undefined = undefined;
let config: TConfig|undefined;

/**
 * Get parsed config object
 * 
 * @example
   ```
   {
    '/ALERTS_URL': 'https://download.cactus.net/notify/mainnet_alert.txt',
    '/daemon_port': 58400,
    '/farmer/network_overrides/config/testnet0/address_prefix': 'tcac',
    ...
   }
   ```
 */
export function getConfig(configFilePath?: string): TConfig {
  // Memoize config data once.
  if(lastConfigPath === configFilePath && config){
    return config;
  }
  lastConfigPath = configFilePath;
  
  const file = readFileSync(configFilePath || configPath, "utf8");
  const parsedYamlObj = parse(file);
  return config = buildConfigObj(parsedYamlObj);
}


export function buildConfigObj(
  config: Record<string, unknown>,
  currentPath: string[] = [],
  product: Record<string, any> = {},
){
  for(const propName in config){
    if(!config.hasOwnProperty(propName)){
      continue;
    }
    
    const value = config[propName];
    if(value && typeof value === "object" && !Array.isArray(value)){
      currentPath.push(propName);
      buildConfigObj(value as Record<string, unknown>, currentPath, product);
      currentPath.pop();
    }
    else if(Array.isArray(value)){
      value.forEach((v, i) => {
        currentPath.push(`${i}`);
        buildConfigObj(v as Record<string, unknown>, currentPath, product);
        currentPath.pop();
      });
    }
    else{
      const path = currentPath.length > 0 ? `/${currentPath.join("/")}/${propName}` : `/${propName}`;
      product[path] = value;
    }
  }
  
  return product;
}

export const defaultDaemonKeyPath = path.resolve(cactusRoot, "config", "ssl", "daemon", "private_daemon.key");
export const defaultDaemonCertPath = path.resolve(cactusRoot, "config", "ssl", "daemon", "private_daemon.crt");

export function resolveFromCactusRoot(pathFromCactusRoot: string[]){
  return path.resolve(cactusRoot, ...pathFromCactusRoot);
}

/**
 * Get path string resolved based on CACTUS_ROOT dir.
 * 
 * @param {string} yPath - Canonical path for yaml. See @description.
 * @param {string?} configFilePath - If you want to specify path for config file, use this param.
 * @description
 *   When YAML is like below:
     ```
     daemon_ssl:
       private_crt: config/ssl/daemon/private_daemon.crt
       private_key: config/ssl/daemon/private_daemon.key
       ...
     ```
     yPath for daemon private key is: `/daemon_ssl/private_key`
 */
export function getPathFromConfig(yPath: string, configFilePath?: string){
  const config = getConfig(configFilePath);
  return resolveFromCactusRoot([config[yPath]] as string[]);
}