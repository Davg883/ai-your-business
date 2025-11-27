/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_email from "../actions/email.js";
import type * as actions_gemini from "../actions/gemini.js";
import type * as actions_marketing from "../actions/marketing.js";
import type * as admin_provisioning from "../admin/provisioning.js";
import type * as admin_publishing from "../admin/publishing.js";
import type * as ai_logging from "../ai/logging.js";
import type * as auth_permissions from "../auth/permissions.js";
import type * as entitlements from "../entitlements.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as library from "../library.js";
import type * as marketing from "../marketing.js";
import type * as projects from "../projects.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/email": typeof actions_email;
  "actions/gemini": typeof actions_gemini;
  "actions/marketing": typeof actions_marketing;
  "admin/provisioning": typeof admin_provisioning;
  "admin/publishing": typeof admin_publishing;
  "ai/logging": typeof ai_logging;
  "auth/permissions": typeof auth_permissions;
  entitlements: typeof entitlements;
  files: typeof files;
  http: typeof http;
  library: typeof library;
  marketing: typeof marketing;
  projects: typeof projects;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
