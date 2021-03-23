import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createCurrentUserHook,
  createPreviewSubscriptionHook,
  ProjectConfig,
} from 'next-sanity';
import getNextConfig from 'next/config';

const { publicRuntimeConfig } = getNextConfig();

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/

const sanityProjectConfig: ProjectConfig = {
  dataset: publicRuntimeConfig.SANITY_DATASET,
  projectId: publicRuntimeConfig.SANITY_PROJECT_ID,
};

export const urlFor = (source) => createImageUrlBuilder(sanityProjectConfig).image(source);

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(sanityProjectConfig);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...sanityProjectConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(sanityProjectConfig);
