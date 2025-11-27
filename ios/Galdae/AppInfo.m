#import "AppInfo.h"

@implementation AppInfo

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;  // YES에서 NO로 변경하여 성능 향상
}

- (NSDictionary *)constantsToExport
{
  NSString *bundleId = [[NSBundle mainBundle] bundleIdentifier] ?: @"";
  NSLog(@"[AppInfo] Bundle Identifier: %@", bundleId);
  return @{
    @"bundleIdentifier": bundleId
  };
}

@end
