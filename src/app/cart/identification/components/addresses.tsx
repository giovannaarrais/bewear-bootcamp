"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Addresses = () => {
  const [selectAddress, setSelectAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identification</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={selectAddress} 
          onValueChange={setSelectAddress}
        >
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adiconar novo endereço </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectAddress == 'add_new' && (
          
        )}

      </CardContent>
    </Card>
  );
};

export default Addresses;
