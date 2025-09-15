"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface CoursePricingFormProps {
  form: any; // react-hook-form instance
}

export function CoursePricingForm({ form }: CoursePricingFormProps) {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Pricing & Monetization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Base Price */}
        <FormField
          control={form.control}
          name="basePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Base Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current Price */}
        <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Current Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group Buying */}
        <FormField
          control={form.control}
          name="groupBuyingEnabled"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel className="text-white">
                  Enable Group Buying
                </FormLabel>
                <p className="text-sm text-gray-400">
                  Offer discounts for group purchases
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.getValues("groupBuyingEnabled") && (
          <FormField
            control={form.control}
            name="groupBuyingDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Group Buying Discount (%)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={(field.value ?? 0) * 100}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) / 100)
                    }
                    className="bg-white/10 border-white/20 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Flash Sale */}
        <FormField
          control={form.control}
          name="isFlashSale"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel className="text-white">Enable Flash Sale</FormLabel>
                <p className="text-sm text-gray-400">
                  Temporary discount period
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.getValues("isFlashSale") && (
          <FormField
            control={form.control}
            name="flashSaleEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Flash Sale End Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={field.value ? field.value.slice(0, 16) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
