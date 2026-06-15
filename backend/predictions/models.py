from django.db import models

class PredictionRequest(models.Model):
    
    created_at = models.DateTimeField(auto_now=True)
    
    input_data = models.JSONField()
    
    predicted_price = models.DecimalField(max_digits=12, decimal_places=2)
    
    model_name = models.CharField(max_length=100, default="linear_regression_model") 
    
    model_version = models.CharField(max_length=100, default= "local-pkl")
    
    # metrics
    
    mae = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank= True)
    
    rmse = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    r2 = models.FloatField( null=True, blank=True)
    
    def __str__(self):
        return f"Prediction {self.id} - ${self.predicted_price}"