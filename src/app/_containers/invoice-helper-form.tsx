"use client";

import { CopyButton } from "@/components/copy-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

function formatCurrency(value: number, currency: "BRL" | "USD" = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

const number = z.coerce
  .number({
    required_error: "Field is required",
    invalid_type_error: "Field must be a number",
  })
  .positive();

const schema = z.object({
  usdPerHour: number,
  usdPriceInBrl: number,
  brlTotalValue: number,
});

type Schema = z.infer<typeof schema>;

export function InvoiceHelperForm() {
  const [queryValues, setQueryValues] = useQueryState<Schema>(
    "values",
    parseAsJson(schema.parse)
  );
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: queryValues || undefined,
  });

  const values = useWatch({ control: form.control });

  useEffect(() => {
    setQueryValues({
      usdPerHour: values.usdPerHour || 0,
      usdPriceInBrl: values.usdPriceInBrl || 0,
      brlTotalValue: values.brlTotalValue || 0,
    });
  }, [setQueryValues, values]);

  const content = useMemo(() => {
    if (!values.usdPriceInBrl || !values.usdPerHour || !values.brlTotalValue)
      return "";

    const usdTotalValue = Math.floor(
      values.brlTotalValue / values.usdPriceInBrl
    );
    const totalHours = Math.floor(usdTotalValue / values.usdPerHour);

    const _totalHours = formatNumber(totalHours);
    const _usdPerHour = formatCurrency(values.usdPerHour, "USD");
    const _usdTotalValue = formatCurrency(usdTotalValue, "USD");
    const _usdPriceInBrl = formatCurrency(values.usdPriceInBrl);
    const _brlTotalValue = formatCurrency(values.brlTotalValue);

    return `Desenvolvimento de sistemas - ${_totalHours}hrs - ${_usdPerHour} a hora - ${_usdTotalValue} \nCotação do dia: ${_usdPriceInBrl} \nValor em moeda nacional: R$${_brlTotalValue} \nInvoice nº XXXXXXXX`;
  }, [values]);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoice Helper</h1>
        <p className="text-muted-foreground mt-2">
          Generate a invoice description providing a few inputs.
        </p>
      </div>

      <Form {...form}>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 items-end gap-4 mt-4">
          <FormField
            control={form.control}
            name="usdPriceInBrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cotação do dia</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="5.40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usdPerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor por hora (USD)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="45" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brlTotalValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor total (BRL)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="20000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>

      <div className="mt-4 relative">
        <pre className="mb-4 mt-6 rounded-lg border bg-foreground/5 py-4 px-6 font-normal">
          {content}
        </pre>
        <CopyButton value={content} className="absolute top-4 right-4" />
      </div>
    </div>
  );
}
